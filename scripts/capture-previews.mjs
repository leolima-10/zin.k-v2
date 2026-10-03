// Captura screenshots dos projetos reais para raw-images/
// Uso: npm run previews (precisa do dev server NÃO rodando; este script abre o Chrome próprio)
import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const PROJECTS = [
  { slug: "dra-aline-lopes", url: "https://site-aline.marcelo-palumbof.workers.dev/" },
  { slug: "giovanna-flamiano", url: "https://giovannaflamiano.marcelo-palumbof.workers.dev/" },
  { slug: "novo-conceito", url: "https://escolanovoconceito.marcelo-palumbof.workers.dev/" },
  { slug: "nixus-marketing", url: "https://nixusmarketing.lovable.app/" },
  { slug: "convite-brenda", url: "https://convitebrenda.lovable.app/" },
  { slug: "menustart", url: "https://menustart.lovable.app/" },
];

const VIEWPORT = { width: 1440, height: 900 };
const RAW_DIR = "raw-images";
const PENDING = [];

async function hideLovableBadge(page) {
  try {
    await page.evaluate(() => {
      // Esconder badge "Edit with Lovable" - link com lovable-badge no href
      const links = document.querySelectorAll('a[href*="lovable-badge"]');
      links.forEach(el => { el.style.display = "none"; });
      // Container fixo do badge
      const badges = document.querySelectorAll('[class*="lovable-badge"]');
      badges.forEach(el => { el.style.display = "none"; });
    });
  } catch (e) {
    // ignore
  }
}

async function waitForImages(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.querySelectorAll("img"));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => { img.onload = img.onerror = resolve; });
    }));
  });
}

async function scrollToBottomAndBack(page) {
  await page.evaluate(async () => {
    const height = document.body.scrollHeight;
    const steps = 8;
    for (let i = 1; i <= steps; i++) {
      window.scrollTo(0, (height * i) / steps);
      await new Promise(r => setTimeout(r, 150));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 200));
  });
}

async function captureProject(browser, project) {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  let success = false;
  let lastError = null;

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`[${project.slug}] Tentativa ${attempt}/2...`);
      await page.goto(project.url, { waitUntil: "networkidle", timeout: 60000 });
      await waitForImages(page);
      await page.waitForTimeout(3500); // contadores animados
      await scrollToBottomAndBack(page);
      await page.waitForTimeout(800);
      await hideLovableBadge(page);

      // Verificar "Nenhum produto ainda" para menustart
      const hasEmptyState = await page.evaluate(() => 
        document.body.innerText.includes("Nenhum produto ainda")
      );
      if (hasEmptyState) {
        console.warn(`AVISO: ${project.slug} — "Nenhum produto ainda" detectado`);
      }

      const buffer = await page.screenshot({ type: "png", fullPage: false });
      const outPath = path.join(RAW_DIR, `${project.slug}.png`);
      await writeFile(outPath, buffer);
      console.log(`[${project.slug}] OK → ${outPath}`);
      success = true;
      break;
    } catch (e) {
      lastError = e;
      console.error(`[${project.slug}] Tentativa ${attempt} falhou: ${e.message}`);
      if (attempt === 1) await page.waitForTimeout(2000);
    }
  }

  await page.close();

  if (!success) {
    console.error(`[${project.slug}] FALHOU após 2 tentativas: ${lastError?.message}`);
    PENDING.push(project.slug);
  }
  return success;
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });
  console.log(`Pasta ${RAW_DIR}/ pronta`);

  const browser = await chromium.launch({ channel: "chrome" });
  console.log("Chrome iniciado");

  for (const project of PROJECTS) {
    await captureProject(browser, project);
  }

  await browser.close();
  console.log("Chrome fechado");

  if (PENDING.length > 0) {
    console.log("\n=== PENDÊNCIAS (falharam após retry) ===");
    PENDING.forEach(s => console.log(`  - ${s}`));
    process.exitCode = 1;
  } else {
    console.log("\n=== TODOS OS PREVIEWS CAPTURADOS ===");
  }
}

main().catch(e => {
  console.error("Erro fatal:", e);
  process.exit(1);
});
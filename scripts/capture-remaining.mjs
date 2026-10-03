// Captura dos 2 projetos restantes
import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const PROJECTS = [
  { slug: "convite-brenda", url: "https://convitebrenda.lovable.app/" },
  { slug: "menustart", url: "https://menustart.lovable.app/" },
];

const VIEWPORT = { width: 1440, height: 900 };
const RAW_DIR = "raw-images";

async function hideLovableBadge(page) {
  await page.evaluate(() => {
    const links = document.querySelectorAll('a[href*="lovable-badge"]');
    links.forEach(el => { el.style.display = "none"; });
    const badges = document.querySelectorAll('[class*="lovable-badge"]');
    badges.forEach(el => { el.style.display = "none"; });
  });
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
      await page.waitForTimeout(3500);
      await scrollToBottomAndBack(page);
      await page.waitForTimeout(800);
      await hideLovableBadge(page);

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
  return success;
}

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  console.log("Chrome iniciado");

  for (const project of PROJECTS) {
    await captureProject(browser, project);
  }

  await browser.close();
  console.log("Chrome fechado");
}

main().catch(e => {
  console.error("Erro fatal:", e);
  process.exit(1);
});
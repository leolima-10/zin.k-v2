// Captura apenas convite-brenda
import { chromium } from "playwright-core";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const PROJECT = { slug: "convite-brenda", url: "https://convitebrenda.lovable.app/" };
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

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  console.log("Chrome iniciado");

  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  
  try {
    console.log(`[${PROJECT.slug}] Carregando...`);
    await page.goto(PROJECT.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    console.log(`[${PROJECT.slug}] DOM carregado, aguardando networkidle...`);
    await page.waitForLoadState("networkidle", { timeout: 30000 });
    console.log(`[${PROJECT.slug}] Network idle`);
    
    await waitForImages(page);
    console.log(`[${PROJECT.slug}] Imagens carregadas`);
    
    await page.waitForTimeout(3500);
    console.log(`[${PROJECT.slug}] Aguardou contadores`);
    
    await scrollToBottomAndBack(page);
    console.log(`[${PROJECT.slug}] Scroll feito`);
    
    await page.waitForTimeout(800);
    await hideLovableBadge(page);
    console.log(`[${PROJECT.slug}] Badge escondido`);

    const hasEmptyState = await page.evaluate(() => 
      document.body.innerText.includes("Nenhum produto ainda")
    );
    if (hasEmptyState) {
      console.warn(`AVISO: ${PROJECT.slug} — "Nenhum produto ainda" detectado`);
    }

    const buffer = await page.screenshot({ type: "png", fullPage: false });
    const outPath = path.join(RAW_DIR, `${PROJECT.slug}.png`);
    await writeFile(outPath, buffer);
    console.log(`[${PROJECT.slug}] OK → ${outPath}`);
  } catch (e) {
    console.error(`[${PROJECT.slug}] FALHOU: ${e.message}`);
  } finally {
    await page.close();
    await browser.close();
    console.log("Chrome fechado");
  }
}

main().catch(e => {
  console.error("Erro fatal:", e);
  process.exit(1);
});
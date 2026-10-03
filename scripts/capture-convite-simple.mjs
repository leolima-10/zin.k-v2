// Captura apenas convite-brenda - versão simplificada
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

async function main() {
  const browser = await chromium.launch({ channel: "chrome" });
  console.log("Chrome iniciado");

  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  
  try {
    console.log(`[${PROJECT.slug}] Carregando...`);
    await page.goto(PROJECT.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    console.log(`[${PROJECT.slug}] DOM carregado`);
    
    // Aguardar fontes e um tempo fixo
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    console.log(`[${PROJECT.slug}] Fontes prontas`);
    
    await page.waitForTimeout(5000);
    console.log(`[${PROJECT.slug}] Aguardou 5s`);
    
    await hideLovableBadge(page);
    console.log(`[${PROJECT.slug}] Badge escondido`);

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
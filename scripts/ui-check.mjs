// driver headless de verificação da UI (roda contra o dev server em localhost:5173)
import { chromium } from "playwright-core";

const results = [];
const check = (name, ok) => results.push([name, ok]);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// home
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const h1 = (await page.textContent("h1")) ?? "";
check("home: h1 contém zin.k", /zin/.test(h1));
await page.screenshot({ path: ".screenshots/home.png" });

// seção portfólio + cards
await page.locator("#portfolio").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
await page.screenshot({ path: ".screenshots/portfolio.png" });
const cardsAll = await page.locator('#portfolio a[href^="/projetos/"]').count();
check(`home: 6 cards de projeto (achou ${cardsAll})`, cardsAll === 6);

// interação: filtro por categoria
await page.getByRole("button", { name: /^e-commerce/ }).click();
await page.waitForTimeout(600);
const cardsFiltered = await page.locator('#portfolio a[href^="/projetos/"]').count();
check(`filtro e-commerce: 2 cards (achou ${cardsFiltered})`, cardsFiltered === 2);
const pressed = await page.getByRole("button", { name: /^e-commerce/ }).getAttribute("aria-pressed");
check("filtro: aria-pressed=true", pressed === "true");
await page.screenshot({ path: ".screenshots/portfolio-filtro.png" });
await page.getByRole("button", { name: /^todos/ }).click();
await page.waitForTimeout(400);
const cardsReset = await page.locator('#portfolio a[href^="/projetos/"]').count();
check("filtro reset: 6 cards novamente", cardsReset === 6);

// contato
await page.locator("#contato").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: ".screenshots/contato.png" });
check("contato: 3 canais + formulário presentes", (await page.locator("#contato a").count()) >= 3);

// página de detalhe
await page.goto("http://localhost:5173/projetos/pulse", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
const detailH1 = (await page.textContent("h1")) ?? "";
check("detalhe: h1 = pulse fitness", detailH1.includes("pulse fitness"));
check("detalhe: título da aba dinâmico", (await page.title()) === "pulse fitness — projeto zin.k");
await page.screenshot({ path: ".screenshots/projeto-pulse.png", fullPage: true });

// 404
await page.goto("http://localhost:5173/rota-inexistente", { waitUntil: "networkidle" });
const nf = (await page.textContent("h1")) ?? "";
check("404: página não encontrada aparece", nf.includes("não existe"));

// mobile: menu hambúrguer
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(800);
await mobile.getByRole("button", { name: "abrir menu" }).click();
await mobile.waitForTimeout(400);
const expanded = await mobile.getByRole("button", { name: "fechar menu" }).getAttribute("aria-expanded");
check("mobile: menu abre (aria-expanded)", expanded === "true");
await mobile.screenshot({ path: ".screenshots/mobile-menu.png" });
await mobile.getByRole("link", { name: "Serviços" }).first().click();
await mobile.waitForTimeout(900);
await mobile.screenshot({ path: ".screenshots/mobile-servicos.png" });

console.log(results.map(([n, ok]) => `${ok ? "PASS" : "FAIL"}  ${n}`).join("\n"));
await browser.close();
process.exit(results.some(([, ok]) => !ok) ? 1 : 0);

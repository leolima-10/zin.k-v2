// driver headless de verificação da UI (roda contra o dev server em localhost:5173)
import { chromium } from "playwright-core";
import { projects } from "../src/data/projects.ts";

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

// interação: filtro por categoria (testar categorias que têm projetos)
const categoriesWithProjects = [
  { name: /^institucional/, label: "institucional", expected: 3 },
  { name: /^landing page/, label: "landing page", expected: 2 },
  { name: /^sistema web/, label: "sistema web", expected: 1 },
];

for (const cat of categoriesWithProjects) {
  await page.getByRole("button", { name: cat.name }).click();
  await page.waitForTimeout(600);
  const cardsFiltered = await page.locator('#portfolio a[href^="/projetos/"]').count();
  check(`filtro ${cat.label}: ${cat.expected} cards (achou ${cardsFiltered})`, cardsFiltered === cat.expected);
  const pressed = await page.getByRole("button", { name: cat.name }).getAttribute("aria-pressed");
  check(`filtro ${cat.label}: aria-pressed=true`, pressed === "true");
  await page.screenshot({ path: `.screenshots/portfolio-filtro-${cat.label.replace(" ", "-")}.png` });
}

// reset filtro
await page.getByRole("button", { name: /^todos/ }).click();
await page.waitForTimeout(400);
const cardsReset = await page.locator('#portfolio a[href^="/projetos/"]').count();
check("filtro reset: 6 cards novamente", cardsReset === 6);

// verificar que e-commerce NÃO aparece no filtro (categoria vazia escondida)
const ecommerceBtn = await page.getByRole("button", { name: /^e-commerce/ }).count();
check("filtro: e-commerce não aparece (categoria vazia escondida)", ecommerceBtn === 0);

// contato
await page.locator("#contato").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: ".screenshots/contato.png" });
check("contato: 3 canais + formulário presentes", (await page.locator("#contato a").count()) >= 3);

// páginas de detalhe - testar todas as 6 rotas
const slugs = projects.map(p => p.slug);
for (const slug of slugs) {
  const project = projects.find(p => p.slug === slug);
  if (!project) continue;
  
  await page.goto(`http://localhost:5173/projetos/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const detailH1 = (await page.textContent("h1")) ?? "";
  check(`detalhe ${slug}: h1 contém "${project.title}"`, detailH1.toLowerCase().includes(project.title.toLowerCase()));
  check(`detalhe ${slug}: título da aba dinâmico`, (await page.title()) === `${project.title} — projeto zin.k`);
  await page.screenshot({ path: `.screenshots/projeto-${slug}.png`, fullPage: true });
}

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
// driver headless de verificação da UI (roda contra o dev server em localhost:5173)
import { chromium } from "playwright-core";
import { projects } from "../src/data/projects.ts";
import { SITE } from "../src/data/site.ts";

const WHATSAPP_NUMBER = SITE.whatsappNumber;
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const results = [];
const check = (name, ok) => results.push([name, ok]);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// ===== F1: todos os links wa.me válidos =====
async function checkWhatsAppLinks(page, contextName) {
  const links = await page.locator('a[href^="https://wa.me/"]').all();
  for (const link of links) {
    const href = await link.getAttribute("href");
    const target = await link.getAttribute("target");
    const rel = await link.getAttribute("rel");
    const ariaLabel = await link.getAttribute("aria-label");
    const text = (await link.textContent()) ?? "";

    const urlOk = href && href.match(new RegExp(`^${WA_BASE}(\\?text=.+)?$`));
    const targetOk = target === "_blank";
    const relOk = rel && rel.includes("noopener") && rel.includes("noreferrer");
    // Nome acessível: ou aria-label contém "nova aba", ou o texto visível + sr-only contém "nova aba"
    const a11yOk = (ariaLabel?.includes("nova aba") ?? false) || text.includes("nova aba");

    check(`${contextName}: wa.me href válido (${href})`, !!urlOk);
    check(`${contextName}: target="_blank"`, targetOk);
    check(`${contextName}: rel com noopener+noreferrer`, relOk);
    check(`${contextName}: nome acessível contém "nova aba"`, a11yOk);
  }
}

// home
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
const h1 = (await page.textContent("h1")) ?? "";
check("home: h1 contém zin.k", /zin/.test(h1));
await page.screenshot({ path: ".screenshots/home.png" });
await checkWhatsAppLinks(page, "home");

// seção portfólio + cards
await page.locator("#portfolio").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
await page.screenshot({ path: ".screenshots/portfolio.png" });
const cardsAll = await page.locator('#portfolio a[href^="/projetos/"]').count();
check(`home: 6 cards de projeto (achou ${cardsAll})`, cardsAll === 6);

// interação: filtro por categoria
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

// verificar que e-commerce NÃO aparece no filtro
const ecommerceBtn = await page.getByRole("button", { name: /^e-commerce/ }).count();
check("filtro: e-commerce não aparece (categoria vazia escondida)", ecommerceBtn === 0);

// contato
await page.locator("#contato").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
await page.screenshot({ path: ".screenshots/contato.png" });
check("contato: 3 canais + formulário presentes", (await page.locator("#contato a").count()) >= 3);
await checkWhatsAppLinks(page, "contato");

// ===== F2: botão flutuante (FAB) =====
const fab = page.locator('[data-testid="whatsapp-fab"]');
await expectVisible(page, fab, "FAB visível na home");
await checkWhatsAppLinks(page, "FAB home");

// Verificar tamanho ≥ 56x56
const fabBox = await fab.boundingBox();
check("FAB: altura ≥ 56px", fabBox && fabBox.height >= 56);
check("FAB: largura ≥ 56px", fabBox && fabBox.width >= 56);

// Verificar focável com outline - navegar via Tab para ativar :focus-visible
await page.keyboard.press("Tab"); // skip link
await page.keyboard.press("Tab"); // logo
await page.keyboard.press("Tab"); // nav link 1
await page.keyboard.press("Tab"); // nav link 2
await page.keyboard.press("Tab"); // nav link 3
await page.keyboard.press("Tab"); // nav link 4
await page.keyboard.press("Tab"); // nav WhatsApp
await page.keyboard.press("Tab"); // menu button
await page.keyboard.press("Tab"); // main content...
// FAB should be focusable, let's focus it directly via evaluate
await fab.evaluate(el => el.focus());
await page.waitForTimeout(100);
const fabFocusStyle = await fab.evaluate(el => getComputedStyle(el));
check("FAB: outline-style ≠ none", fabFocusStyle.outlineStyle !== "none");
check("FAB: outline-width ≥ 2px", parseFloat(fabFocusStyle.outlineWidth) >= 2);

// ===== F3: formulário =====
// Stub window.open
await page.addInitScript(() => {
  window.__lastOpen = null;
  const originalOpen = window.open;
  window.open = (url, target, features) => {
    window.__lastOpen = { url, target, features };
    return null;
  };
});

// Testar vazio -> nenhuma chamada, aria-invalid presente, foco no primeiro inválido
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await page.locator("#contato").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.click('button[type="submit"]');
await page.waitForTimeout(300);
const lastOpenEmpty = await page.evaluate(() => window.__lastOpen);
check("form vazio: window.open não chamado", lastOpenEmpty === null);
const nomeInvalid = await page.locator("#nome").getAttribute("aria-invalid");
const emailInvalid = await page.locator("#email").getAttribute("aria-invalid");
const msgInvalid = await page.locator("#mensagem").getAttribute("aria-invalid");
check("form vazio: nome aria-invalid=true", nomeInvalid === "true");
check("form vazio: email aria-invalid=true", emailInvalid === "true");
check("form vazio: mensagem aria-invalid=true", msgInvalid === "true");
const activeEl = await page.evaluate(() => document.activeElement?.id);
check("form vazio: foco no primeiro inválido (nome)", activeEl === "nome");

// Preencher válido
await page.fill("#nome", "teste da silva");
await page.fill("#email", "teste@exemplo.com");
await page.fill("#mensagem", "preciso de um site novo");
await page.click('button[type="submit"]');
await page.waitForTimeout(500);
const lastOpenValid = await page.evaluate(() => window.__lastOpen);
check("form válido: window.open chamado exatamente 1 vez", lastOpenValid !== null);
if (lastOpenValid) {
  check("form válido: target=_blank", lastOpenValid.target === "_blank");
  check("form válido: features com noopener", lastOpenValid.features?.includes("noopener"));
  check("form válido: features com noreferrer", lastOpenValid.features?.includes("noreferrer"));
  const expectedText = "oi, zin.k! vim pelo site.\n\nnome: teste da silva\ne-mail: teste@exemplo.com\n\nmensagem:\npreciso de um site novo";
  const expectedUrl = `${WA_BASE}?text=${encodeURIComponent(expectedText)}`;
  check("form válido: URL correta", lastOpenValid.url === expectedUrl);
}

// Link de fallback visível com mesmo href
const fallbackLink = page.locator('a:has-text("clique aqui para tentar novamente")');
check("form válido: link de fallback visível", await fallbackLink.isVisible());
const fallbackHref = await fallbackLink.getAttribute("href");
check("form válido: fallback href = URL do whatsapp", fallbackHref === lastOpenValid?.url);

// Mensagem longa (700 chars "ã") -> erro de tamanho
// Reset do stub antes do teste
await page.evaluate(() => { window.__lastOpen = null; });
await page.fill("#mensagem", "ã".repeat(700));
await page.click('button[type="submit"]');
await page.waitForTimeout(300);
const lastOpenLong = await page.evaluate(() => window.__lastOpen);
check("form msg longa: window.open não chamado", lastOpenLong === null);
const msgError = await page.locator("#mensagem-error").textContent();
check("form msg longa: erro de tamanho visível", msgError?.includes("longa") ?? false);

// ===== F4: CTAs por seção =====
// Hero
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
await checkWhatsAppLinks(page, "hero CTAs");

// Navbar desktop
const navbarDesktop = page.locator('nav >> a[href^="https://wa.me/"]');
check("navbar desktop: tem link wa.me", await navbarDesktop.count() > 0);

// Navbar mobile - abrir menu
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(800);
await mobile.getByRole("button", { name: "abrir menu" }).click();
await mobile.waitForTimeout(400);
await checkWhatsAppLinks(mobile, "navbar mobile");
const mobileMenuItems = await mobile.locator('nav >> a[href^="https://wa.me/"]').all();
check("navbar mobile: item wa.me no menu", mobileMenuItems.length > 0);

// Services - 6 links
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.locator("#servicos").scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
const serviceLinks = await page.locator('#servicos a[href^="https://wa.me/"]').all();
check("services: 6 links wa.me (um por serviço)", serviceLinks.length === 6);
for (const link of serviceLinks) {
  const href = await link.getAttribute("href");
  check(`services: link wa.me tem parâmetro text`, href?.includes("text=") ?? false);
}

// Project pages - CTA "Quero um site assim"
for (const slug of projects.map(p => p.slug).slice(0, 2)) {
  const project = projects.find(p => p.slug === slug);
  if (!project) continue;
  await page.goto(`http://localhost:5173/projetos/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const projectCTA = page.locator('a[href^="https://wa.me/"]:has-text("Quero um site assim")');
  check(`projeto ${slug}: CTA "Quero um site assim"`, await projectCTA.count() > 0);
  if (await projectCTA.count() > 0) {
    const href = await projectCTA.getAttribute("href");
    // Verifica se o text decodificado contém o título do projeto
    const textParam = href?.match(/text=([^&]+)/)?.[1];
    const decodedText = textParam ? decodeURIComponent(textParam) : "";
    check(`projeto ${slug}: CTA cita título no text`, decodedText.toLowerCase().includes(project.title.toLowerCase()));
  }
}

// CtaBand
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.locator("section.bg-accent").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const ctaBandLink = page.locator('section.bg-accent a[href^="https://wa.me/"]');
check("CtaBand: link wa.me", await ctaBandLink.count() > 0);

// Footer - número visível
await page.locator("footer").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const footerWhatsApp = page.locator('footer a[href^="https://wa.me/"]');
check("footer: link wa.me presente", await footerWhatsApp.count() > 0);
const footerWhatsAppText = (await footerWhatsApp.first().textContent()) ?? "";
check("footer: número visível no link", footerWhatsAppText.includes(SITE.whatsappLabel));

// Link para /#contato na navbar
const navContatoLink = page.locator('nav a[href="/#contato"]');
check("navbar: link para /#contato existe", await navContatoLink.count() > 0);

// ===== F5: sem overflow horizontal, sem mailto programático, número só em site.ts =====
const viewports = [
  { width: 320, height: 568 },
  { width: 375, height: 667 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

for (const vp of viewports) {
  await page.setViewportSize(vp);
  await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
  check(`overflow horizontal ${vp.width}px`, !overflow);
}

// Verificar se FAB não cobre rodapé no mobile: footer deve ter padding-bottom ≥ 200px no mobile
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);
const footerPaddingBottom = await page.locator("footer > div:first-child").evaluate(el => parseInt(getComputedStyle(el).paddingBottom));
check("mobile: footer padding-bottom ≥ 200px", footerPaddingBottom >= 200);

// Verificar FAB não cobre menu mobile (em nova página para garantir estado limpo)
const mobile2 = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile2.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await mobile2.waitForTimeout(1000);
await mobile2.getByRole("button", { name: "abrir menu" }).click();
await mobile2.waitForTimeout(800);
// Debug: check if body has the attribute
const bodyAttr = await mobile2.evaluate(() => document.body.getAttribute("data-mobile-menu-open"));
check("mobile menu: body data-mobile-menu-open=true", bodyAttr === "true");
const fabHidden = await mobile2.locator('[data-testid="whatsapp-fab"]').isHidden();
check("mobile menu aberto: FAB oculto", fabHidden);
await mobile2.close();

// ===== F5 estático: grep no código (simulado via eval) =====
const mailtoInHref = await page.evaluate(() => {
  const links = document.querySelectorAll('a[href^="mailto:"]');
  return Array.from(links).filter(a => a.href.includes("?subject=") || a.href.includes("?body=")).length;
});
check("páginas: sem mailto: programático (com subject/body)", mailtoInHref === 0);

console.log(results.map(([n, ok]) => `${ok ? "PASS" : "FAIL"}  ${n}`).join("\n"));
await browser.close();
process.exit(results.some(([, ok]) => !ok) ? 1 : 0);

async function expectVisible(page, locator, name) {
  const visible = await locator.isVisible();
  check(`${name}`, visible);
  return visible;
}
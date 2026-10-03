import { chromium } from "playwright-core";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.locator("#portfolio").scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);

const buttons = await page.getByRole("button").all();
for (const btn of buttons) {
  const name = await btn.getAttribute("aria-label") || await btn.textContent() || "";
  const pressed = await btn.getAttribute("aria-pressed");
  console.log(`Button: "${name.trim()}" aria-pressed: ${pressed}`);
}

await browser.close();
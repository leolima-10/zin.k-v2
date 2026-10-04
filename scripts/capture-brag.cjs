/**
 * Brag video capture script for zin.k project
 * Uses playwright to capture key frames at specific timestamps
 * 
 * Run with: npx playwright run capture-brag.js
 * 
 * This captures screenshots of key scenes from the homepage,
 * which can then be compiled into a video or used as key frames.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(process.cwd(), 'brag-output', 'work');
const URL = 'http://localhost:5173';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const scenes = [
  { name: 'hook', delay: 1.0, description: 'Logo + headline appear' },
  { name: 'reveal', delay: 3.5, description: '4-step process visualization' },
  { name: 'highlight1', delay: 6.0, description: 'Sem template - custom design' },
  { name: 'highlight2', delay: 9.0, description: 'Resultado nao enfeite - performance' },
  { name: 'highlight3', delay: 12.0, description: 'Design e codigo na mesma mesa' },
  { name: 'punchline', delay: 16.0, description: 'Vamos criar juntos? CTA' },
];

async function captureScene(page, scene) {
  // Wait for the page to stabilize
  await page.waitForTimeout(scene.delay * 1000);
  
  // Additional wait for any animations to settle
  await page.waitForTimeout(500);
  
  const screenshotPath = path.join(OUTPUT_DIR, `${scene.name}.png`);
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
    omitBackground: false,
  });
  
  console.log(` captured: ${scene.name} -> ${screenshotPath}`);
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark',
  });
  const page = await context.newPage();
  
  await page.goto(URL, { waitUntil: 'networkidle' });
  
  // Wait for initial load
  await page.waitForTimeout(2000);
  
  for (const scene of scenes) {
    await captureScene(page, scene);
  }
  
  await browser.close();
  console.log('\nAll scenes captured!');
  console.log(`Images saved to: ${OUTPUT_DIR}/`);
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
// Captura screenshots desktop + mobile de um case usando o Chrome instalado.
// Uso: node scripts/capture-case.mjs <url> <nome-base>
// Saída: src/img/<nome-base>-desktop.png e src/img/<nome-base>-mobile.png
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const [url, name] = process.argv.slice(2);
if (!url || !name) {
  console.error('Uso: node scripts/capture-case.mjs <url> <nome-base>');
  process.exit(1);
}

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);
const executablePath = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) throw new Error('Chrome não encontrado. Defina CHROME_PATH.');

// Esconde banners de cookies e widgets flutuantes que poluem o mockup.
const HIDE_OVERLAYS = `
  [class*="cookie" i], [id*="cookie" i], [class*="consent" i], [id*="consent" i] { display: none !important; }
  *, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }
`;

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const browser = await puppeteer.launch({ executablePath, headless: true });
try {
  for (const [label, viewport] of Object.entries(VIEWPORTS)) {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60_000 });
    await page.addStyleTag({ content: HIDE_OVERLAYS });
    await new Promise((r) => setTimeout(r, 2500)); // deixa efeitos de digitação/entrada assentarem
    // Banners/botões fixos ancorados na metade inferior (cookies, WhatsApp flutuante).
    await page.evaluate(() => {
      for (const el of document.querySelectorAll('body *')) {
        const style = getComputedStyle(el);
        if (style.position !== 'fixed') continue;
        if (el.getBoundingClientRect().top > window.innerHeight / 2) el.style.display = 'none';
      }
    });
    const out = path.resolve('src/img', `${name}-${label}.png`);
    await page.screenshot({ path: out });
    console.log('✓', out);
    await page.close();
  }
} finally {
  await browser.close();
}

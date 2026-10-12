// Verifica contraste WCAG dos tokens de cor (temas escuro e claro) em src/styles/tokens.css.
// Uso: npm run contrast — falha (exit 1) se algum par de texto ficar abaixo de AA (4.5:1).
import fs from 'node:fs';

const css = fs.readFileSync('src/styles/tokens.css', 'utf8');

const readTheme = (selector) => {
  const start = css.indexOf(`${selector} {`);
  const block = css.slice(start, css.indexOf('}', start));
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
};

const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const TEXT = ['text', 'text-muted', 'text-subtle', 'accent'];
const BACKGROUNDS = ['bg', 'bg-tint', 'surface', 'surface-2'];

// Tema único (claro). Se houver `:root[data-theme='dark']`, ele também é verificado.
const base = readTheme(':root');
const themes = { principal: base };
if (css.includes(":root[data-theme='dark']")) themes.escuro = { ...base, ...readTheme(":root[data-theme='dark']") };

let failures = 0;
for (const [name, t] of Object.entries(themes)) {
  console.log(`\nTema ${name}`);
  const pairs = [
    ...TEXT.flatMap((fg) => BACKGROUNDS.map((bg) => [fg, bg])),
    ['btn-ink', 'btn-bg'],
    ['btn-ink', 'btn-bg-hover'],
    ...(t['band-bg'] ? [['band-text', 'band-bg'], ['band-muted', 'band-bg'], ['band-gold', 'band-bg']] : []),
  ];
  for (const [fg, bg] of pairs) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= 4.5;
    if (!ok) failures++;
    console.log(`  ${ok ? '✓' : '✗'} ${fg.padEnd(12)} sobre ${bg.padEnd(12)} ${r.toFixed(2)}:1`);
  }
}

process.exit(failures ? 1 : 0);

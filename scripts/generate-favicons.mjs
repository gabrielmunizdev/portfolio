import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs/promises';
import path from 'path';

// Monograma GM/ (vetor) — mesma identidade do header. Renderizado em alta densidade para nitidez.
const src = path.resolve('src/assets/brand/favicon.svg');
const outDir = path.resolve('public');

async function ensureSource() {
  try {
    await fs.access(src);
  } catch {
    throw new Error(`Imagem de origem não encontrada em: ${src}`);
  }
}

async function generatePng(size, filename) {
  const dest = path.join(outDir, filename);
  await sharp(src, { density: Math.max(72, (size / 32) * 72 * 2) })
    .resize(size, size, { fit: 'cover' })
    .png({ quality: 100 })
    .toFile(dest);
  return dest;
}

(async () => {
  await ensureSource();

  const files = {};
  files['16'] = await generatePng(16, 'favicon-16x16.png');
  files['32'] = await generatePng(32, 'favicon-32x32.png');
  files['180'] = await generatePng(180, 'apple-touch-icon.png');
  files['192'] = await generatePng(192, 'android-chrome-192x192.png');
  files['512'] = await generatePng(512, 'android-chrome-512x512.png');

  await fs.copyFile(src, path.join(outDir, 'favicon.svg'));

  const icoBuffer = await pngToIco([files['16'], files['32']]);
  await fs.writeFile(path.join(outDir, 'favicon.ico'), icoBuffer);

  console.log('Favicons gerados com sucesso:');
  console.log(Object.values(files));
  console.log('favicon.ico criado em public/ (o manifesto fica em public/site.webmanifest).');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
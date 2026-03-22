import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import fs from 'fs/promises';
import path from 'path';

const src = path.resolve('src/img/gabriel-muniz-logo.png');
const outDir = path.resolve('src/img');
const root = process.cwd();

async function ensureSource() {
  try {
    await fs.access(src);
  } catch {
    throw new Error(`Imagem de origem não encontrada em: ${src}`);
  }
}

async function generatePng(size, filename) {
  const dest = path.join(outDir, filename);
  await sharp(src)
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

  const icoBuffer = await pngToIco([files['16'], files['32']]);
  await fs.writeFile(path.resolve(root, 'favicon.ico'), icoBuffer);

  const manifest = {
    name: "Gabriel Muniz | Portfolio",
    short_name: "G.Muniz",
    icons: [
      { src: "./src/img/android-chrome-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "./src/img/android-chrome-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" }
    ],
    theme_color: "#0b0f1a",
    background_color: "#0b0f1a",
    display: "standalone",
    start_url: "/"
  };

  await fs.writeFile(path.resolve(root, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

  console.log('Favicons gerados com sucesso:');
  console.log(Object.values(files));
  console.log('favicon.ico e site.webmanifest criados.');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
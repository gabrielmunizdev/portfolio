// Gera as variantes responsivas (.avif + .webp) usadas no site a partir dos originais em src/img.
// Uso: npm run images
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('src/img');
const OUT = path.resolve('src/assets/img');
const PUBLIC = path.resolve('public');

/**
 * name: nome de saída (sem extensão) · widths: larguras geradas
 * extract: recorte opcional em px no original (ex.: remover marca d'água)
 */
const IMAGES = [
  { src: 'gabriel-muniz-perfil.png', name: 'gabriel-muniz', widths: [360, 720], extract: { left: 0, top: 40, width: 864, height: 1040 } },
  { src: 'christian-silva-desktop.png', name: 'case-christian-silva-desktop', widths: [720, 1440] },
  { src: 'christian-silva-mobile.png', name: 'case-christian-silva-mobile', widths: [240, 480] },
];

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(PUBLIC, { recursive: true });

for (const img of IMAGES) {
  const input = path.join(SRC, img.src);
  for (const width of img.widths) {
    const base = () => {
      let pipe = sharp(input);
      if (img.extract) pipe = pipe.extract(img.extract);
      return pipe.resize({ width, withoutEnlargement: true });
    };
    await base().avif({ quality: 55, effort: 6 }).toFile(path.join(OUT, `${img.name}-${width}.avif`));
    await base().webp({ quality: 78, effort: 6 }).toFile(path.join(OUT, `${img.name}-${width}.webp`));
    console.log(`✓ ${img.name}-${width}`);
  }
}

// Imagem de compartilhamento (WhatsApp/LinkedIn): 1200x630, JPEG para máxima compatibilidade.
const portrait = await sharp(path.join(SRC, 'gabriel-muniz-perfil.png'))
  .extract({ left: 0, top: 40, width: 864, height: 1040 })
  .resize({ width: 440, height: 630, fit: 'cover', position: 'top' })
  .toBuffer();

const ogText = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#fbf9f6"/>
  <rect x="64" y="96" width="56" height="1.5" fill="#b8975f"/>
  <text x="64" y="150" font-family="Georgia, serif" font-size="22" letter-spacing="5" fill="#7d6036">GABRIEL MUNIZ</text>
  <text x="64" y="250" font-family="Georgia, serif" font-size="60" fill="#2a211c">Sites de alto padrão</text>
  <text x="64" y="320" font-family="Georgia, serif" font-size="60" fill="#2a211c">para clínicas e</text>
  <text x="64" y="390" font-family="Georgia, serif" font-size="60" fill="#6e6259">negócios premium.</text>
  <text x="64" y="500" font-family="Arial, sans-serif" font-size="24" fill="#5c5149">Estratégia de conversão · Design · Performance</text>
  <text x="64" y="545" font-family="Arial, sans-serif" font-size="24" fill="#5c5149">Aracaju/SE · Atendimento em todo o Brasil</text>
</svg>`);

await sharp(ogText)
  .composite([{ input: portrait, left: 760, top: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(PUBLIC, 'og-image.jpg'));
console.log('✓ public/og-image.jpg');

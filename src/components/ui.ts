import { html, type Html } from '../lib/html';
import type { ResponsiveImage } from '../data/projects';
import { icon, type IconName } from './icons';

/** Cabeçalho padrão das seções: numeral romano + rótulo em versalete + título serif + subtítulo opcional. */
export const sectionHeading = (opts: {
  id: string;
  index: string;
  eyebrow: string;
  title: Html | string;
  lead?: string;
}): Html => html`
  <header class="section-heading reveal">
    <p class="eyebrow"><span class="eyebrow__num">${opts.index}</span>${opts.eyebrow}</p>
    <h2 id="${opts.id}" class="section-title">${opts.title}</h2>
    ${opts.lead ? html`<p class="section-lead">${opts.lead}</p>` : ''}
  </header>
`;

/**
 * Número de destaque em serif: sinais (+ − % ×) saem em sans sobrescrita e o traço de intervalo (–) em sans
 * na altura média — os traços finos da didone somem nesses glifos.
 */
export const figureValue = (value: string): Html =>
  html`${[...value].map((ch) =>
    ch === '–'
      ? html`<span class="sym sym--range">${ch}</span>`
      : /[+−%×]/.test(ch)
        ? html`<span class="sym">${ch}</span>`
        : ch,
  )}`;

type ButtonVariant = 'primary' | 'ghost' | 'link';

export const buttonLink = (opts: {
  href: string;
  label: string;
  variant?: ButtonVariant;
  icon?: IconName;
  external?: boolean;
  className?: string;
  attrs?: Html;
}): Html => html`
  <a class="btn btn--${opts.variant ?? 'primary'} ${opts.className ?? ''}" href="${opts.href}"
     ${opts.external ? html`target="_blank" rel="noopener"` : ''} ${opts.attrs ?? ''}>
    ${opts.icon ? icon(opts.icon) : ''}<span>${opts.label}</span>
  </a>
`;

/** <picture> com AVIF + WebP e srcset responsivo. */
export const picture = (opts: {
  image: ResponsiveImage;
  alt: string;
  sizes: string;
  eager?: boolean;
  className?: string;
}): Html => {
  const { base, widths, width, height } = opts.image;
  const srcset = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
  return html`
    <picture class="${opts.className ?? ''}">
      <source type="image/avif" srcset="${srcset('avif')}" sizes="${opts.sizes}">
      <img src="${base}-${widths[0]}.webp" srcset="${srcset('webp')}" sizes="${opts.sizes}"
           width="${width}" height="${height}" alt="${opts.alt}"
           loading="${opts.eager ? 'eager' : 'lazy'}" decoding="async"
           ${opts.eager ? html`fetchpriority="high"` : ''}>
    </picture>
  `;
};

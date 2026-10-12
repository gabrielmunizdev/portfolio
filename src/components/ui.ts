import { html, type Html } from '../lib/html';
import type { ResponsiveImage } from '../data/projects';
import { icon, type IconName } from './icons';

/** Cabeçalho padrão das seções: índice + eyebrow (mono) + título + subtítulo opcional. */
export const sectionHeading = (opts: {
  id: string;
  index: string;
  eyebrow: string;
  title: Html | string;
  lead?: string;
}): Html => html`
  <header class="section-heading reveal">
    <p class="eyebrow mono"><span class="eyebrow__index">[${opts.index}]</span>${opts.eyebrow}</p>
    <h2 id="${opts.id}" class="section-title">${opts.title}</h2>
    ${opts.lead ? html`<p class="section-lead">${opts.lead}</p>` : ''}
  </header>
`;

type ButtonVariant = 'primary' | 'ghost';

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

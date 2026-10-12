import { html } from '../lib/html';
import { navLinks, site, whatsappUrl } from '../data/site';
import { buttonLink } from './ui';

export const header = () => html`
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="brand" href="#topo" aria-label="${site.name} — voltar ao início">
        <span class="brand__name">${site.name}</span>
        <span class="brand__role">Sites para clínicas</span>
      </a>
      <nav class="site-nav" aria-label="Principal">
        <ul>
          ${navLinks.map((link) => html`<li><a href="${link.href}">${link.label}</a></li>`)}
        </ul>
      </nav>
      ${buttonLink({
        href: whatsappUrl(),
        label: 'Diagnóstico gratuito',
        external: true,
        className: 'btn--sm site-header__cta',
        attrs: html`data-track="header_whatsapp"`,
      })}
    </div>
  </header>
`;

import { html } from '../lib/html';
import { navLinks, site, whatsappUrl } from '../data/site';
import { icon } from './icons';
import { buttonLink } from './ui';

export const header = () => html`
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  <header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="brand" href="#topo" aria-label="${site.name} — voltar ao início">
        <span class="brand__mark" aria-hidden="true">GM<span>/</span></span>
        <span class="brand__name">${site.name}</span>
      </a>
      <nav class="site-nav" aria-label="Principal">
        <ul>
          ${navLinks.map(
            (link, i) =>
              html`<li><a href="${link.href}"><span class="site-nav__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${link.label}</a></li>`,
          )}
        </ul>
      </nav>
      <div class="site-header__actions">
        <button type="button" class="icon-btn theme-toggle" data-theme-toggle aria-label="Alternar tema claro/escuro">
          <span class="theme-toggle__sun">${icon('sun', 16)}</span>
          <span class="theme-toggle__moon">${icon('moon', 16)}</span>
        </button>
        ${buttonLink({
          href: whatsappUrl(),
          label: 'Diagnóstico gratuito',
          icon: 'whatsapp',
          external: true,
          className: 'btn--sm site-header__cta',
          attrs: html`data-track="header_whatsapp"`,
        })}
      </div>
    </div>
  </header>
`;

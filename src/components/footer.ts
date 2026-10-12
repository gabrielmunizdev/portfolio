import { html } from '../lib/html';
import { navLinks, site, whatsappUrl } from '../data/site';
import { icon, type IconName } from './icons';

export const footer = () => html`
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div class="site-footer__brand">
        <a class="brand" href="#topo" aria-label="${site.name} — voltar ao início">
          <span class="brand__name">${site.name}</span>
          <span class="brand__role">Sites para clínicas</span>
        </a>
        <p>${site.role}. Sites de alto padrão para clínicas e negócios premium — ${site.serviceArea}.</p>
      </div>
      <nav aria-label="Rodapé">
        <ul class="site-footer__nav">
          ${navLinks.map((link) => html`<li><a href="${link.href}">${link.label}</a></li>`)}
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
      <ul class="site-footer__social">
        ${site.socials.map(
          (s) => html`<li><a class="icon-btn" href="${s.href}" target="_blank" rel="noopener me" aria-label="${s.label} (abre em nova aba)">${icon(s.icon as IconName, 18)}</a></li>`,
        )}
      </ul>
    </div>
    <p class="site-footer__wordmark" aria-hidden="true">Gabriel Muniz</p>
    <div class="container site-footer__legal">
      <p>© ${new Date().getFullYear()} ${site.name}. Todos os direitos reservados.</p>
      <p>${icon('pin', 14)} ${site.location} · atendimento em todo o Brasil</p>
    </div>
  </footer>
`;

/** Barra fixa de conversão no mobile; exibida via JS após o Hero e oculta na seção de contato. */
export const stickyCta = () => html`
  <div class="sticky-cta" data-sticky-cta inert>
    <a class="btn btn--primary btn--block" href="${whatsappUrl()}" target="_blank" rel="noopener" data-track="sticky_whatsapp">
      <span>Agendar diagnóstico no WhatsApp</span>
    </a>
  </div>
`;

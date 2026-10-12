import { html } from '../lib/html';
import { site, whatsappUrl } from '../data/site';
import { projects } from '../data/projects';
import { buttonLink, figureValue, picture } from './ui';

/** Prova no Hero: o projeto real mais recente (status 'cliente'). */
const recent = projects.find((p) => p.status === 'cliente');

/** Retrato em arco com moldura fina deslocada e legenda editorial. */
const portrait = () => html`
  <figure class="portrait">
    <div class="portrait__frame">
      ${picture({
        image: { base: '/src/assets/img/gabriel-muniz', widths: [360, 720], width: 720, height: 867 },
        alt: `Retrato de ${site.name}`,
        sizes: '(min-width: 1024px) 400px, (min-width: 640px) 360px, 82vw',
        eager: true,
        className: 'portrait__img',
      })}
    </div>
    <figcaption class="portrait__caption">
      <span class="label">${site.name}</span>
      <span>${site.role}</span>
    </figcaption>
  </figure>
`;

export const hero = () => html`
  <section class="hero" id="topo" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__content">
        <p class="hero__kicker label hero-in">
          <span>${site.location}</span><span class="hero__kicker-rule" aria-hidden="true"></span><span>${site.availability}</span>
        </p>

        <h1 id="hero-title" class="hero__title">
          Sites de alto padrão que transformam a reputação da sua clínica em <em>agendamentos.</em>
        </h1>

        <p class="hero__lead hero-in" style="--delay: 80ms">
          Estratégia de conversão, design premium e performance para clínicas de estética,
          dermatologistas, cirurgiões plásticos e negócios de alto ticket.
        </p>

        <div class="hero__actions hero-in" style="--delay: 140ms" data-hero-actions>
          ${buttonLink({
            href: whatsappUrl(),
            label: 'Solicitar diagnóstico gratuito',
            external: true,
            attrs: html`data-track="hero_whatsapp"`,
          })}
          ${buttonLink({ href: '#cases', label: 'Ver projetos', variant: 'link' })}
        </div>
        <p class="hero__note hero-in" style="--delay: 180ms">${site.responseTime} · sem compromisso</p>
      </div>

      <div class="hero__visual hero-in" style="--delay: 100ms">${portrait()}</div>
    </div>

    <div class="container hero__footer hero-in" style="--delay: 240ms">
      <dl class="metrics">
        ${site.metrics.map(
          (m) => html`<div class="metrics__item">
            <dt class="label">${m.label}</dt>
            <dd>${figureValue(m.value)}</dd>
          </div>`,
        )}
      </dl>
      ${recent
        ? html`<div class="hero-proof">
            <p class="label">Projeto recente</p>
            <p class="hero-proof__title">${recent.title}</p>
            <p class="hero-proof__text">${recent.result.value} ${recent.result.label}.</p>
            <a class="link-line" href="#case-${recent.slug}">Ver o projeto</a>
          </div>`
        : ''}
    </div>
  </section>
`;

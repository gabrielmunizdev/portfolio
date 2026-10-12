import { html } from '../lib/html';
import { site, whatsappUrl } from '../data/site';
import { testimonials } from '../data/testimonials';
import { icon } from './icons';
import { buttonLink, picture } from './ui';

const proof = testimonials[0];

/** Indicador de sistema vivo: localização, disponibilidade e hora local (atualizada via JS). */
const statusLine = () => html`
  <p class="status-line mono hero-in">
    <span class="status-line__dot" aria-hidden="true"></span>
    <span class="status-line__loc">${site.locationCode}</span>
    <span aria-hidden="true">—</span>
    <span class="status-line__state">${site.availability}</span>
    <span class="status-line__clock" aria-hidden="true" data-clock data-tz="${site.timeZone}"></span>
  </p>
`;

/** Retrato como crachá de engenharia: monocromático, com metadados em mono. */
const badge = () => html`
  <figure class="badge glow-card">
    <div class="badge__bar mono" aria-hidden="true">
      <span>ID · GM-0001</span>
      <span class="badge__live"><i></i>REC</span>
    </div>
    <div class="badge__frame">
      ${picture({
        image: { base: '/src/assets/img/gabriel-muniz', widths: [360, 720], width: 720, height: 867 },
        alt: `Retrato de ${site.name}`,
        sizes: '(min-width: 1024px) 400px, (min-width: 640px) 360px, 86vw',
        eager: true,
        className: 'badge__img',
      })}
      <span class="badge__scan" aria-hidden="true"></span>
      <span class="badge__crop" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    </div>
    <figcaption class="badge__meta">
      <dl class="mono">
        <div><dt>nome</dt><dd>${site.name}</dd></div>
        <div><dt>função</dt><dd>${site.role}</dd></div>
        <div><dt>base</dt><dd>${site.location} · BR</dd></div>
        <div><dt>stack</dt><dd>${site.stack.join(' / ')}</dd></div>
      </dl>
    </figcaption>
  </figure>
`;

export const hero = () => html`
  <section class="hero" id="topo" aria-labelledby="hero-title">
    <div class="hero__grid-bg" aria-hidden="true"></div>
    <div class="container hero__grid">
      <div class="hero__content">
        ${statusLine()}

        <h1 id="hero-title" class="hero__title">
          Sites de alto padrão que transformam a reputação da sua clínica em <em>agendamentos.</em><span class="hero__cursor" aria-hidden="true"></span>
        </h1>

        <p class="hero__lead hero-in" style="--delay: 80ms">
          Estratégia de conversão, design premium e performance para clínicas de estética,
          dermatologistas, cirurgiões plásticos e negócios de alto ticket.
        </p>

        <div class="hero__actions hero-in" style="--delay: 140ms" data-hero-actions>
          ${buttonLink({
            href: whatsappUrl(),
            label: 'Solicitar diagnóstico gratuito',
            icon: 'whatsapp',
            external: true,
            attrs: html`data-track="hero_whatsapp"`,
          })}
          ${buttonLink({ href: '#cases', label: 'Ver cases', variant: 'ghost', icon: 'arrowRight' })}
        </div>
        <p class="hero__note mono hero-in" style="--delay: 180ms">${icon('check', 14)} ${site.responseTime} · Sem compromisso</p>
      </div>

      <div class="hero__visual hero-in" style="--delay: 100ms">${badge()}</div>
    </div>

    <div class="container hero__footer hero-in" style="--delay: 240ms">
      <dl class="metrics">
        ${site.metrics.map(
          (m, i) => html`<div class="metrics__item">
            <dt class="mono"><span aria-hidden="true">${String(i + 1).padStart(2, '0')} /</span> ${m.label}</dt>
            <dd>${m.value}</dd>
          </div>`,
        )}
      </dl>
      <figure class="hero-proof">
        <figcaption class="mono"><span aria-hidden="true">&gt;</span> ${proof.name} · ${proof.role}</figcaption>
        <blockquote><p>“${proof.quote}”</p></blockquote>
      </figure>
    </div>
  </section>
`;

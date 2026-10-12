import { html, type Html } from '../lib/html';
import { projects, type MockPreview, type Project, type ResultKind } from '../data/projects';
import { icon } from './icons';
import { figureValue, picture, sectionHeading } from './ui';

const RESULT_LABEL: Record<ResultKind, string> = {
  resultado: 'Resultado medido',
  meta: 'Meta do projeto',
  entrega: 'Destaque da entrega',
};

/** Mini-site desenhado em CSS para cases conceito (escala com container queries). */
const mockSite = (mock: MockPreview, variant: 'desktop' | 'mobile'): Html => html`
  <div class="mock mock--${variant}" aria-hidden="true"
       style="--m-bg: ${mock.palette.bg}; --m-fg: ${mock.palette.fg}; --m-accent: ${mock.palette.accent}; --m-muted: ${mock.palette.muted}">
    <div class="mock__nav">
      <span class="mock__logo">${mock.brand}</span>
      <span class="mock__links"><i></i><i></i><i></i></span>
      <span class="mock__pill">Agendar</span>
    </div>
    <div class="mock__hero">
      <span class="mock__eyebrow">${mock.eyebrow}</span>
      <span class="mock__title">${mock.headline}</span>
      <span class="mock__lines"><i></i><i></i></span>
      <span class="mock__cta">${mock.cta}</span>
    </div>
    <div class="mock__art"><i></i></div>
    <div class="mock__cards"><i></i><i></i><i></i></div>
  </div>
`;

const devices = (project: Project): Html => {
  const { preview } = project;
  const host =
    preview.type === 'screenshot' && project.url
      ? new URL(project.url).host
      : `${preview.type === 'mock' ? preview.brand.toLowerCase().replace(/\s+/g, '') : project.slug} · conceito`;

  const desktopScreen =
    preview.type === 'screenshot'
      ? picture({ image: preview.desktop, alt: preview.alt, sizes: '(min-width: 1024px) 640px, 92vw' })
      : mockSite(preview, 'desktop');
  const mobileScreen =
    preview.type === 'screenshot'
      ? picture({ image: preview.mobile, alt: '', sizes: '160px' })
      : mockSite(preview, 'mobile');

  return html`
    <div class="devices" ${preview.type === 'mock' ? html`role="img" aria-label="Prévia ilustrativa do site ${preview.brand} em desktop e celular"` : ''}>
      <div class="device-desktop">
        <div class="device-desktop__bar" aria-hidden="true">
          <span class="device-desktop__dots"><i></i><i></i><i></i></span>
          <span class="device-desktop__url">${host}</span>
        </div>
        <div class="device-desktop__screen">${desktopScreen}</div>
      </div>
      <div class="device-phone" aria-hidden="true">
        <div class="device-phone__screen">${mobileScreen}</div>
      </div>
    </div>
  `;
};

/** Ficha do projeto: decisões concretas + resultado (meta ou medido, sempre rotulado). */
const sheet = (project: Project): Html => html`
  <div class="sheet">
    <p class="sheet__title label">Ficha do projeto${project.status === 'conceito' ? ' · metas' : ''}</p>
    <dl class="sheet__rows">
      ${project.specs.map((spec) => html`<div><dt>${spec.key}</dt><dd>${spec.value}</dd></div>`)}
      <div><dt>Tecnologia</dt><dd>${project.tech.join(', ')}</dd></div>
    </dl>
    <div class="sheet__result">
      <span class="label">${RESULT_LABEL[project.result.kind]}</span>
      <strong class="sheet__value">${figureValue(project.result.value)}</strong>
      <span class="sheet__label">${project.result.label}</span>
    </div>
  </div>
`;

const caseCard = (project: Project): Html => html`
  <article class="case reveal" aria-labelledby="case-${project.slug}">
    <div class="case__media">${devices(project)}</div>
    <div class="case__body">
      <p class="case__meta label">
        ${project.category} · ${project.status === 'cliente' ? 'Projeto entregue' : 'Projeto conceito'} · ${project.year}
      </p>
      <h3 class="case__title" id="case-${project.slug}">${project.title}</h3>
      <dl class="case__details">
        <div><dt class="label">O desafio</dt><dd>${project.problem}</dd></div>
        <div><dt class="label">A solução</dt><dd>${project.solution}</dd></div>
      </dl>
      ${sheet(project)}
      ${project.url
        ? html`<a class="link-line" href="${project.url}" target="_blank" rel="noopener">
            Ver site no ar<span class="visually-hidden"> — ${project.title} (abre em nova aba)</span>${icon('arrowUpRight', 16)}
          </a>`
        : ''}
    </div>
  </article>
`;

export const cases = () => html`
  <section class="section" id="cases" aria-labelledby="cases-title">
    <div class="container">
      ${sectionHeading({
        id: 'cases-title',
        eyebrow: 'Cases',
        index: 'II',
        title: html`Presença digital à altura de <em>marcas premium.</em>`,
        lead: 'Projetos entregues e estudos conceito que mostram o método aplicado a clínicas, médicos e serviços de alto ticket.',
      })}
      <div class="case-list">
        ${projects.map(caseCard)}
      </div>
    </div>
  </section>
`;

import { html, type Html } from '../lib/html';
import { projects, type MockPreview, type Project, type ResultKind } from '../data/projects';
import { icon } from './icons';
import { picture, sectionHeading } from './ui';

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

/** Painel estilo terminal: specs técnicas + resultado do case. */
const terminal = (project: Project): Html => {
  const isConcept = project.status === 'conceito';
  return html`
    <div class="term" role="group" aria-label="Especificações e resultado">
      <div class="term__bar mono" aria-hidden="true">
        <span class="term__dots"><i></i><i></i><i></i></span>
        <span>~/cases/${project.slug}</span>
      </div>
      <dl class="term__body mono">
        ${project.specs.map(
          (spec) => html`<div class="term__row">
            <dt>${spec.key}${isConcept ? html`<span class="term__flag">alvo</span>` : ''}</dt>
            <dd>${spec.value}</dd>
          </div>`,
        )}
      </dl>
      <div class="term__result">
        <span class="term__prompt mono"><span aria-hidden="true">$</span> ${RESULT_LABEL[project.result.kind].toLowerCase()}</span>
        <strong class="term__value">${project.result.value}</strong>
        <span class="term__label">${project.result.label}</span>
      </div>
    </div>
  `;
};

const caseCard = (project: Project, index: number): Html => html`
  <article class="case glow-card reveal" aria-labelledby="case-${project.slug}">
    <header class="case__meta mono">
      <span class="case__index">CASE_${String(index + 1).padStart(2, '0')}</span>
      <span>${project.category}</span>
      <span class="case__status case__status--${project.status}">
        <i aria-hidden="true"></i>${project.status === 'cliente' ? 'Entregue' : 'Conceito'}
      </span>
      <span class="case__year">${project.year}</span>
    </header>
    <div class="case__grid">
      <div class="case__media">${devices(project)}</div>
      <div class="case__body">
        <h3 class="case__title" id="case-${project.slug}">${project.title}</h3>
        <dl class="case__details">
          <div><dt class="mono">Problema</dt><dd>${project.problem}</dd></div>
          <div><dt class="mono">Solução</dt><dd>${project.solution}</dd></div>
        </dl>
        <ul class="stack mono" aria-label="Tecnologia">${project.tech.map((t) => html`<li>${t}</li>`)}</ul>
        ${terminal(project)}
        ${project.url
          ? html`<a class="link-arrow mono" href="${project.url}" target="_blank" rel="noopener">
              Ver site no ar<span class="visually-hidden"> — ${project.title} (abre em nova aba)</span>${icon('arrowUpRight', 16)}
            </a>`
          : ''}
      </div>
    </div>
  </article>
`;

export const cases = () => html`
  <section class="section" id="cases" aria-labelledby="cases-title">
    <div class="container">
      ${sectionHeading({
        id: 'cases-title',
        eyebrow: 'Cases',
        index: '02',
        title: html`Presença digital à altura de <em>marcas premium.</em>`,
        lead: 'Projetos entregues e estudos conceito que mostram o método aplicado a clínicas, médicos e serviços de alto ticket.',
      })}
      <div class="case-list">
        ${projects.map(caseCard)}
      </div>
    </div>
  </section>
`;

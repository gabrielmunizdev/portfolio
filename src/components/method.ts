import { html } from '../lib/html';
import { segments } from '../data/site';
import { methodSteps } from '../data/content';
import { sectionHeading } from './ui';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export const segmentsStrip = () => html`
  <section class="segments" aria-label="Segmentos atendidos">
    <div class="container segments__inner">
      <p class="segments__label label">Especialista em</p>
      <ul class="segments__list">
        ${segments.map((s) => html`<li>${s}</li>`)}
      </ul>
    </div>
  </section>
`;

export const method = () => html`
  <section class="section" id="metodo" aria-labelledby="metodo-title">
    <div class="container">
      ${sectionHeading({
        id: 'metodo-title',
        eyebrow: 'Método',
        index: 'I',
        title: html`Do primeiro clique à <em>consulta agendada.</em>`,
        lead: 'Um site bonito não basta. Cada etapa do projeto existe para que o paciente certo encontre sua clínica, confie e agende — sem atrito.',
      })}
      <ol class="method-grid">
        ${methodSteps.map(
          (step, i) => html`
            <li class="method-card reveal" style="--delay: ${i * 70}ms">
              <span class="method-card__num" aria-hidden="true">${ROMAN[i]}</span>
              <h3 class="method-card__title">${step.title}</h3>
              <p class="method-card__text">${step.text}</p>
              <ul class="method-card__list">
                ${step.deliverables.map((d) => html`<li>${d}</li>`)}
              </ul>
            </li>
          `,
        )}
      </ol>
    </div>
  </section>
`;

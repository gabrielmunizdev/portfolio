import { html } from '../lib/html';
import { segments } from '../data/site';
import { methodSteps } from '../data/content';
import { sectionHeading } from './ui';

export const segmentsStrip = () => html`
  <section class="segments" aria-label="Segmentos atendidos">
    <div class="container segments__inner">
      <p class="segments__label mono">Especialista em</p>
      <ul class="segments__list mono">
        ${segments.map((s, i) => html`<li><span aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${s}</li>`)}
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
        index: '01',
        title: html`Do primeiro clique à <em>consulta agendada.</em>`,
        lead: 'Um site bonito não basta. Cada etapa do projeto existe para que o paciente certo encontre sua clínica, confie e agende — sem atrito.',
      })}
      <ol class="method-grid">
        ${methodSteps.map(
          (step, i) => html`
            <li class="method-card glow-card reveal" style="--delay: ${i * 70}ms">
              <span class="method-card__index mono" aria-hidden="true">${String(i + 1).padStart(2, '0')}<span>/${String(methodSteps.length).padStart(2, '0')}</span></span>
              <h3 class="method-card__title">${step.title}</h3>
              <p class="method-card__text">${step.text}</p>
              <ul class="method-card__list mono">
                ${step.deliverables.map((d) => html`<li>${d}</li>`)}
              </ul>
            </li>
          `,
        )}
      </ol>
    </div>
  </section>
`;

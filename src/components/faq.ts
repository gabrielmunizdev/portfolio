import { html } from '../lib/html';
import { faqs } from '../data/content';
import { icon } from './icons';
import { sectionHeading } from './ui';

export const faq = () => html`
  <section class="section" id="faq" aria-labelledby="faq-title">
    <div class="container faq">
      ${sectionHeading({
        id: 'faq-title',
        eyebrow: 'Dúvidas',
        index: '04',
        title: html`Perguntas <em>frequentes.</em>`,
        lead: 'O que donos de clínicas e médicos costumam perguntar antes de começar.',
      })}
      <div class="faq__list reveal">
        ${faqs.map(
          (item, i) => html`
            <details class="faq__item" name="faq" ${i === 0 ? html`open` : ''}>
              <summary>${item.question}<span class="faq__icon">${icon('plus')}</span></summary>
              <p>${item.answer}</p>
            </details>
          `,
        )}
      </div>
    </div>
  </section>
`;

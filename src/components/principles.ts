import { html } from '../lib/html';
import { principles as items } from '../data/content';
import { sectionHeading } from './ui';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

/** Banda escura com os princípios de trabalho — ocupa o lugar dos depoimentos enquanto não houver relatos do nicho. */
export const principles = () => html`
  <section class="section section--band" id="principios" aria-labelledby="principios-title">
    <div class="container">
      ${sectionHeading({
        id: 'principios-title',
        eyebrow: 'Princípios',
        index: 'III',
        title: html`O que não muda em <em>nenhum projeto.</em>`,
      })}
      <ol class="principles">
        ${items.map(
          (p, i) => html`
            <li class="principle reveal" style="--delay: ${i * 70}ms">
              <span class="principle__num" aria-hidden="true">${ROMAN[i]}</span>
              <h3 class="principle__title">${p.title}</h3>
              <p class="principle__text">${p.text}</p>
            </li>
          `,
        )}
      </ol>
    </div>
  </section>
`;

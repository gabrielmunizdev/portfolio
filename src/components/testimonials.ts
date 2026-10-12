import { html } from '../lib/html';
import { testimonials as items } from '../data/testimonials';
import { icon } from './icons';
import { sectionHeading } from './ui';

export const testimonials = () => html`
  <section class="section section--tinted" id="depoimentos" aria-labelledby="depoimentos-title">
    <div class="container">
      <div class="section-heading-row">
        ${sectionHeading({
          id: 'depoimentos-title',
          eyebrow: 'Depoimentos',
          index: '03',
          title: html`Quem já trabalhou <em>comigo.</em>`,
        })}
        <div class="carousel-controls reveal" data-carousel-controls hidden>
          <button type="button" class="icon-btn" data-carousel-prev aria-controls="testimonial-track" aria-label="Depoimento anterior">
            ${icon('chevronLeft')}
          </button>
          <button type="button" class="icon-btn" data-carousel-next aria-controls="testimonial-track" aria-label="Próximo depoimento">
            ${icon('chevronRight')}
          </button>
        </div>
      </div>

      <div class="carousel reveal" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
        <ul class="carousel__track" id="testimonial-track" tabindex="0" data-carousel-track>
          ${items.map(
            (t, i) => html`
              <li class="carousel__slide" aria-roledescription="slide" aria-label="${i + 1} de ${items.length}">
                <figure class="testimonial glow-card">
                  <span class="testimonial__index mono" aria-hidden="true">// ${String(i + 1).padStart(2, '0')}</span>
                  <blockquote class="testimonial__quote"><p>${t.quote}</p></blockquote>
                  <figcaption class="testimonial__author">
                    <img src="${t.avatar}" width="40" height="40" alt="" loading="lazy" decoding="async">
                    <span><strong>${t.name}</strong><span class="mono">${t.role}</span></span>
                  </figcaption>
                </figure>
              </li>
            `,
          )}
        </ul>
      </div>
    </div>
  </section>
`;

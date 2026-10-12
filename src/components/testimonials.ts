import { html } from '../lib/html';
import { testimonials as items } from '../data/testimonials';
import { carouselControls, sectionHeading } from './ui';

/**
 * Depoimentos — só renderiza quando houver relatos reais e autorizados do nicho (ver data/testimonials.ts).
 * Ao ativar, renumere os índices romanos das seções seguintes.
 */
export const testimonials = () =>
  items.length === 0
    ? html``
    : html`
  <section class="section section--tinted" id="depoimentos" aria-labelledby="depoimentos-title">
    <div class="container" data-carousel>
      ${sectionHeading({
        id: 'depoimentos-title',
        eyebrow: 'Depoimentos',
        index: 'IV',
        title: html`Quem já trabalhou <em>comigo.</em>`,
      })}
      <div class="carousel reveal" role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes">
        <ul class="carousel__track" id="testimonial-track" tabindex="0" data-carousel-track>
          ${items.map(
            (t, i) => html`
              <li class="carousel__slide" aria-roledescription="slide" aria-label="${i + 1} de ${items.length}">
                <figure class="testimonial">
                  <span class="testimonial__mark" aria-hidden="true">“</span>
                  <blockquote class="testimonial__quote"><p>${t.quote}</p></blockquote>
                  <figcaption class="testimonial__author">
                    <img src="${t.avatar}" width="40" height="40" alt="" loading="lazy" decoding="async">
                    <span><strong>${t.name}</strong><span class="label">${t.role}</span></span>
                  </figcaption>
                </figure>
              </li>
            `,
          )}
        </ul>
      </div>
      ${carouselControls({ trackId: 'testimonial-track', prev: 'Depoimento anterior', next: 'Próximo depoimento' })}
    </div>
  </section>
`;

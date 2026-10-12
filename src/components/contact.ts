import { html } from '../lib/html';
import { segments, site } from '../data/site';
import { composeLeadMessage, leadGoals } from '../lib/lead-message';
import { icon } from './icons';
import { buttonLink, sectionHeading } from './ui';

const choiceGroup = (legend: string, name: string, options: readonly string[]) => html`
  <fieldset class="choice-group">
    <legend>${legend}</legend>
    <div class="choice-grid">
      ${options.map(
        (option) => html`
          <label class="choice">
            <input type="radio" name="${name}" value="${option}">
            <span>${option}</span>
          </label>
        `,
      )}
    </div>
  </fieldset>
`;

export const contact = () => html`
  <section class="section contact" id="contato" aria-labelledby="contato-title">
    <div class="container contact__grid">
      <div class="contact__intro">
        ${sectionHeading({
          id: 'contato-title',
          eyebrow: 'Próximo passo',
          index: '05',
          title: html`Vamos desenhar a presença digital que sua clínica <em>merece.</em>`,
          lead: 'Responda duas perguntas rápidas e continue a conversa direto no meu WhatsApp, com a mensagem pronta.',
        })}
        <ul class="contact__benefits reveal">
          <li><span class="mono" aria-hidden="true">01</span>Diagnóstico gratuito do seu site e do seu Google</li>
          <li><span class="mono" aria-hidden="true">02</span>Plano de ação priorizado para gerar agendamentos</li>
          <li><span class="mono" aria-hidden="true">03</span>${site.responseTime}, sem compromisso</li>
        </ul>
        <div class="contact__alt reveal">
          ${buttonLink({
            href: site.calendly,
            label: 'Prefiro agendar uma call de 30 min',
            variant: 'ghost',
            icon: 'calendar',
            external: true,
            attrs: html`data-track="contact_calendly"`,
          })}
          <a class="contact__email" href="mailto:${site.email}">${icon('mail', 18)}${site.email}</a>
        </div>
      </div>

      <form class="lead-flow glow-card reveal" data-lead-flow
            action="https://wa.me/${site.whatsapp.number}" method="get" target="_blank" rel="noopener">
        <div class="lead-flow__bar mono" aria-hidden="true">
          <span class="term__dots"><i></i><i></i><i></i></span>
          <span>diagnostico.sh</span>
          <span class="lead-flow__ready"><i></i>pronto</span>
        </div>
        <p class="lead-flow__title">Diagnóstico gratuito</p>
        ${choiceGroup('1. Qual é o seu segmento?', 'segmento', segments)}
        ${choiceGroup('2. Qual o principal objetivo agora?', 'objetivo', leadGoals)}
        <div class="field">
          <label for="lead-name">3. Seu nome <span class="field__optional">(opcional)</span></label>
          <input id="lead-name" name="nome" type="text" autocomplete="name" placeholder="Ex.: Dra. Ana">
        </div>
        <div class="lead-flow__preview">
          <span class="lead-flow__preview-label mono">&gt; mensagem que será enviada</span>
          <p data-lead-preview aria-live="polite">${composeLeadMessage({})}</p>
        </div>
        <input type="hidden" name="text" value="${composeLeadMessage({})}" data-lead-text>
        <button type="submit" class="btn btn--primary btn--block" data-track="contact_whatsapp">
          ${icon('whatsapp')}<span>Continuar no WhatsApp</span>
        </button>
        <p class="lead-flow__fine">Abre o WhatsApp com a mensagem pronta. Nenhum dado é armazenado neste site.</p>
      </form>
    </div>
  </section>
`;

import { composeLeadMessage } from '../lib/lead-message';
import { site } from '../data/site';

/** Brilho que acompanha o ponteiro nos cards (atualiza só variáveis CSS, 1x por frame). */
export function initGlowCards() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let frame = 0;
  document.addEventListener(
    'pointermove',
    (event) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>('.glow-card');
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    },
    { passive: true },
  );
}

/** Relógio local no indicador de status do Hero (hora de Aracaju), atualizado a cada minuto. */
export function initClock() {
  const el = document.querySelector<HTMLElement>('[data-clock]');
  if (!el) return;
  const format = new Intl.DateTimeFormat('pt-BR', {
    timeZone: el.dataset.tz,
    hour: '2-digit',
    minute: '2-digit',
  });
  const tick = () => {
    el.textContent = `${format.format(new Date())} BRT`;
    setTimeout(tick, 60_000 - (Date.now() % 60_000));
  };
  tick();
}

/** Carrossel de depoimentos baseado em scroll-snap; botões só aparecem se houver overflow. */
export function initCarousel() {
  const track = document.querySelector<HTMLElement>('[data-carousel-track]');
  const controls = document.querySelector<HTMLElement>('[data-carousel-controls]');
  const prev = document.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = document.querySelector<HTMLButtonElement>('[data-carousel-next]');
  if (!track || !controls || !prev || !next) return;

  const step = () => (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? track.clientWidth;
  const sync = () => {
    const overflow = track.scrollWidth - track.clientWidth > 4;
    controls.hidden = !overflow;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', sync, { passive: true });
  new ResizeObserver(sync).observe(track);
  sync();
}

/** Fluxo de contato: monta a mensagem do WhatsApp a partir das respostas. */
export function initLeadFlow() {
  const form = document.querySelector<HTMLFormElement>('[data-lead-flow]');
  if (!form) return;
  const preview = form.querySelector<HTMLElement>('[data-lead-preview]');
  const hidden = form.querySelector<HTMLInputElement>('[data-lead-text]');

  const message = () => {
    const data = new FormData(form);
    return composeLeadMessage({
      segment: data.get('segmento')?.toString(),
      goal: data.get('objetivo')?.toString(),
      name: data.get('nome')?.toString(),
    });
  };

  form.addEventListener('input', () => {
    const text = message();
    if (preview) preview.textContent = text;
    if (hidden) hidden.value = text;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const url = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message())}`;
    window.open(url, '_blank', 'noopener');
  });
}

/** Eventos de conversão: envia para GA4/GTM se estiverem instalados. */
export function initTracking() {
  document.addEventListener('click', (event) => {
    const el = (event.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
    const payload = { event: 'cta_click', cta_id: el.dataset.track };
    w.dataLayer?.push(payload);
    w.gtag?.('event', 'cta_click', { cta_id: el.dataset.track });
  });
}

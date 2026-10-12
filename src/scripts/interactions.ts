import { composeLeadMessage } from '../lib/lead-message';
import { site } from '../data/site';

/**
 * Carrosséis em scroll-snap ([data-carousel]). Controles e progresso só aparecem quando há overflow —
 * o mesmo markup vira grade no desktop e carrossel no mobile só por CSS.
 */
export function initCarousels() {
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-carousel-track]');
    const controls = root.querySelector<HTMLElement>('[data-carousel-controls]');
    const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
    const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
    const progress = root.querySelector<HTMLElement>('[data-carousel-progress]');
    if (!track) return;

    const step = () => {
      const first = track.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return (first?.offsetWidth ?? track.clientWidth) + gap;
    };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const overflow = max > 4;
      if (controls) controls.hidden = !overflow;
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next) next.disabled = track.scrollLeft >= max - 4;
      progress?.style.setProperty('--progress', String((track.scrollLeft + track.clientWidth) / track.scrollWidth));
    };

    prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', sync, { passive: true });
    new ResizeObserver(sync).observe(track);
    sync();
  });
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

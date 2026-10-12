/** Reveal on scroll, estado do header, link ativo do menu e visibilidade do CTA fixo. */

export function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => observer.observe(el));
}

export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  // Sentinela de 1px no topo: evita listener de scroll.
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting)).observe(
    sentinel,
  );

  // Destaca a seção atual no menu.
  const links = new Map<string, HTMLAnchorElement>();
  header.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="#"]').forEach((a) => {
    links.set(a.hash.slice(1), a);
  });
  // Observa todas as seções: as que não têm link (ex.: contato) limpam o destaque.
  const sections = document.querySelectorAll<HTMLElement>('main section[id]');
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((a) => a.removeAttribute('aria-current'));
        links.get(entry.target.id)?.setAttribute('aria-current', 'true');
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => spy.observe(s));
}

/** Mostra a barra fixa depois que os CTAs do Hero saem da tela; esconde no contato/rodapé. */
export function initStickyCta() {
  const bar = document.querySelector<HTMLElement>('[data-sticky-cta]');
  const heroActions = document.querySelector('[data-hero-actions]');
  if (!bar || !heroActions) return;

  const blockers = [document.getElementById('contato'), document.querySelector('.site-footer')].filter(
    (el): el is HTMLElement => el !== null,
  );
  let pastHero = false;
  const blocking = new Set<Element>();

  const update = () => {
    const visible = pastHero && blocking.size === 0;
    bar.classList.toggle('is-visible', visible);
    bar.inert = !visible;
  };

  new IntersectionObserver(([entry]) => {
    pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    update();
  }).observe(heroActions);

  const blockerObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) blocking.add(entry.target);
      else blocking.delete(entry.target);
    }
    update();
  });
  blockers.forEach((el) => blockerObserver.observe(el));
}

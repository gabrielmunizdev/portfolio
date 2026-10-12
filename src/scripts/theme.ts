type Theme = 'light' | 'dark';

const THEME_COLORS: Record<Theme, string> = { dark: '#0a0a0a', light: '#ffffff' };

const current = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function apply(theme: Theme, persist: boolean) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[data-theme-color]')?.setAttribute('content', THEME_COLORS[theme]);
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
  });
  if (persist) {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* armazenamento indisponível (modo privado) — segue sem persistir */
    }
  }
}

export function initTheme() {
  apply(current(), false);
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => apply(current() === 'dark' ? 'light' : 'dark', true));
  });
}

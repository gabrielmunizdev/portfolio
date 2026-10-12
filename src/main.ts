import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/motion.css';

import { initTheme } from './scripts/theme';
import { initHeader, initReveal, initStickyCta } from './scripts/scroll-effects';
import { initCarousel, initClock, initGlowCards, initLeadFlow, initTracking } from './scripts/interactions';

initTheme();
initReveal();
initHeader();
initStickyCta();
initCarousel();
initGlowCards();
initClock();
initLeadFlow();
initTracking();

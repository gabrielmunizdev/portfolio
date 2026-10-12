import '@fontsource-variable/bodoni-moda/opsz.css';
import '@fontsource-variable/hanken-grotesk';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/motion.css';

import { initHeader, initReveal, initStickyCta } from './scripts/scroll-effects';
import { initCarousels, initLeadFlow, initTracking } from './scripts/interactions';

initReveal();
initHeader();
initStickyCta();
initCarousels();
initLeadFlow();
initTracking();

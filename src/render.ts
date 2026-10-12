/**
 * Composição da página. Executado em build (e no dev server) pelo plugin em vite.config.ts:
 * o HTML final é estático — sem custo de renderização no navegador.
 */
import { site } from './data/site';
import { faqs } from './data/content';
import { header } from './components/header';
import { hero } from './components/hero';
import { method, segmentsStrip } from './components/method';
import { cases } from './components/cases';
import { testimonials } from './components/testimonials';
import { faq } from './components/faq';
import { contact } from './components/contact';
import { footer, stickyCta } from './components/footer';

const structuredData = () => {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${site.name} — ${site.role}`,
      url: site.url,
      image: `${site.url}/og-image.jpg`,
      email: site.email,
      telephone: `+${site.whatsapp.number}`,
      areaServed: [{ '@type': 'City', name: 'Aracaju' }, { '@type': 'Country', name: 'Brasil' }],
      address: { '@type': 'PostalAddress', addressLocality: 'Aracaju', addressRegion: 'SE', addressCountry: 'BR' },
      founder: { '@type': 'Person', name: site.name, jobTitle: site.role, sameAs: site.socials.map((s) => s.href) },
      knowsAbout: ['Landing pages', 'Sites para clínicas', 'Otimização de conversão', 'SEO local'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];
  // `<` escapado para não fechar a tag <script> prematuramente.
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
};

export function renderPage(): Record<string, string> {
  return {
    header: header().__html,
    main: [hero(), segmentsStrip(), method(), cases(), testimonials(), faq(), contact()]
      .map((s) => s.__html)
      .join('\n'),
    footer: footer().__html + stickyCta().__html,
    'structured-data': structuredData(),
  };
}

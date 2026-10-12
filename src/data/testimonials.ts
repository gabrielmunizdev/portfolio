export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

/**
 * Depoimentos de clientes. Ao receber depoimentos de clínicas/médicos, adicione-os no topo
 * da lista — o primeiro item também aparece como prova social no Hero.
 */
export const testimonials: readonly Testimonial[] = [
  {
    quote:
      'Gabriel automatizou todo nosso processo de onboarding de clientes. Reduzimos de 3 dias para 2 horas! O ROI foi alcançado em menos de 2 meses.',
    name: 'Ricardo Costa',
    role: 'CEO, TechFlow Solutions',
    avatar: '/src/img/testimonial-avatar-ricardo.svg',
  },
  {
    quote:
      'O chatbot com IA que Gabriel desenvolveu atende 80% das dúvidas dos clientes automaticamente. Nossa equipe de suporte agora foca em casos complexos.',
    name: 'Mariana Silva',
    role: 'Diretora de Operações, EcoMart',
    avatar: '/src/img/testimonial-avatar-mariana.svg',
  },
  {
    quote:
      'Dashboard financeiro com integração bancária automática. Economizamos 15h/semana em trabalho manual. Profissional extremamente competente!',
    name: 'Paulo Andrade',
    role: 'Fundador, FinanceHub',
    avatar: '/src/img/testimonial-avatar-paulo.svg',
  },
];

/** Configuração central: contatos, links e números exibidos no site. */
export const site = {
  name: 'Gabriel Muniz',
  role: 'Estrategista de Conversão & Web Developer',
  url: 'https://gabrielmunizdev.site',
  location: 'Aracaju/SE',
  serviceArea: 'Aracaju/SE e todo o Brasil',
  email: 'gabrielmunizdev@gmail.com',
  calendly: 'https://calendly.com/gabrielmunizdev/30min',
  availability: 'Agenda aberta para o 4º trimestre',
  responseTime: 'Resposta em até 24h úteis',
  whatsapp: {
    number: '5512996545144',
    defaultMessage:
      'Olá Gabriel, vi seu portfólio e gostaria de um diagnóstico para a presença digital da minha clínica.',
  },
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/gabrielmunizdev', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/gabrielmunizdev', icon: 'github' },
    { label: 'X (Twitter)', href: 'https://twitter.com/gabrielmuniz', icon: 'x' },
  ],
  /**
   * Compromissos de entrega exibidos no Hero. Só promessas que o processo garante (ver FAQ e Método);
   * números de histórico (projetos, satisfação) entram apenas quando puderem ser comprovados.
   */
  metrics: [
    { value: '5–10', label: 'Dias para a landing page no ar' },
    { value: '95+', label: 'Nota de performance no Lighthouse' },
    { value: '24h', label: 'Úteis para responder seu contato' },
  ],
} as const;

export const whatsappUrl = (message: string = site.whatsapp.defaultMessage): string =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const navLinks = [
  { href: '#metodo', label: 'Método' },
  { href: '#cases', label: 'Cases' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'Dúvidas' },
] as const;

/** Segmentos atendidos — exibidos na faixa de especialidades e no fluxo de contato. */
export const segments = [
  'Clínicas de Estética',
  'Dermatologia',
  'Cirurgia Plástica',
  'Odontologia Estética',
  'Medicina Integrativa',
  'Negócios Premium',
] as const;

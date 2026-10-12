/** Configuração central: contatos, links e números exibidos no site. */
export const site = {
  name: 'Gabriel Muniz',
  role: 'Estrategista de Conversão & Web Developer',
  url: 'https://gabrielmunizdev.site',
  location: 'Aracaju/SE',
  /** Código curto exibido nos indicadores de status (estilo terminal). */
  locationCode: 'AJU/SE',
  /** Fuso usado no relógio ao vivo do Hero. */
  timeZone: 'America/Maceio',
  serviceArea: 'Aracaju/SE e todo o Brasil',
  email: 'gabrielmunizdev@gmail.com',
  calendly: 'https://calendly.com/gabrielmunizdev/30min',
  availability: 'Disponível para Q4/26',
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
  /** Stack exibida no crachá do Hero. */
  stack: ['TypeScript', 'Astro', 'Next.js', 'Vite'],
  metrics: [
    { value: '87+', label: 'Projetos entregues' },
    { value: '98%', label: 'Clientes satisfeitos' },
    { value: '5+', label: 'Anos de experiência' },
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

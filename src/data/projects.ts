/**
 * Cases exibidos na seção "Cases".
 *
 * status:
 *  - 'cliente'  → projeto real entregue. `result.kind` pode ser 'resultado' (métrica medida) ou 'entrega'.
 *  - 'conceito' → estudo de caso demonstrando a metodologia. `result.kind` deve ser 'meta'
 *                 (a UI identifica como "Projeto conceito" e "Meta do projeto").
 * Ao fechar um case real de saúde, troque o conceito correspondente e use kind 'resultado'
 * apenas com números medidos (GA4, CRM, agenda).
 */

export type ProjectStatus = 'cliente' | 'conceito';
export type ResultKind = 'resultado' | 'meta' | 'entrega';

export interface ResponsiveImage {
  /** Caminho sem sufixo; o arquivo final é `${base}-${width}.{avif,webp}` (gerado por `npm run images`). */
  base: string;
  widths: readonly number[];
  width: number;
  height: number;
}

export interface ScreenshotPreview {
  type: 'screenshot';
  alt: string;
  desktop: ResponsiveImage;
  mobile: ResponsiveImage;
}

/** Prévia desenhada em HTML/CSS (zero bytes de imagem) para cases conceito. */
export interface MockPreview {
  type: 'mock';
  brand: string;
  eyebrow: string;
  headline: string;
  cta: string;
  palette: { bg: string; fg: string; accent: string; muted: string };
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  problem: string;
  solution: string;
  tech: readonly string[];
  result: { kind: ResultKind; value: string; label: string };
  /**
   * Linhas técnicas do painel "terminal" do case. Em cases 'conceito' são metas de projeto
   * (a UI marca como alvo); em cases 'cliente', use apenas fatos verificáveis ou números medidos.
   */
  specs: readonly { key: string; value: string }[];
  year: number;
  /** Projeto real ainda não publicado: a UI mostra "Em desenvolvimento" em vez de "Projeto entregue". */
  inProgress?: boolean;
  url?: string;
  preview: ScreenshotPreview | MockPreview;
}

export const projects: readonly Project[] = [
  {
    slug: 'luana-rios',
    title: 'Dra. Luana Rios — Cirurgia Plástica',
    category: 'Cirurgia Plástica',
    status: 'cliente',
    problem:
      'Marca já consolidada — o monograma LR em ouro — e um site antigo que não acompanhava o cuidado da consulta. Toda a comunicação precisava seguir, linha a linha, as regras de publicidade médica da Resolução CFM 2.336/2023.',
    solution:
      'Design system extraído do próprio logo (porcelana, ouro e espresso; Marcellus e Jost; arcos da silhueta) e uma landing que vai da avaliação à alta, explica o que cada cirurgia pode e não pode fazer e mantém CRM e RQE visíveis em toda a página.',
    tech: ['HTML e CSS sob medida', 'Design system próprio', 'AVIF/WebP'],
    result: { kind: 'entrega', value: '0', label: 'termos vedados pela CFM na copy, verificados por lint automático' },
    specs: [
      { key: 'Identidade', value: 'design system extraído do monograma da marca' },
      { key: 'Conformidade', value: 'checklist da CFM 2.336/2023, artigo por artigo' },
      { key: 'Credenciais', value: 'CRM e RQE no hero, na faixa e no rodapé' },
    ],
    year: 2026,
    url: 'https://luana-rios.vercel.app/',
    preview: {
      type: 'screenshot',
      alt: 'Landing page da Dra. Luana Rios — Cirurgia Plástica, em desktop e celular',
      desktop: { base: '/src/assets/img/case-luana-rios-desktop', widths: [720, 1440], width: 1440, height: 900 },
      mobile: { base: '/src/assets/img/case-luana-rios-mobile', widths: [240, 480], width: 480, height: 1039 },
    },
  },
  {
    slug: 'luiza-negreiros',
    title: 'Dra. Luiza Negreiros — Dermatologia',
    category: 'Dermatologia',
    status: 'cliente',
    problem:
      'A clínica já tinha uma identidade forte no espaço físico — a parede vinho, o carvalho ripado e o monograma LN —, mas ela ainda não tinha tradução no digital. O site precisava transmitir a mesma consulta sem pressa que a paciente encontra no consultório.',
    solution:
      'Design system extraído da própria clínica (vinho da parede, carvalho e porcelana; Cormorant Garamond e Jost; arcos do monograma) e uma landing com tratamentos em ficha, jornada do paciente em etapas e agendamento pelo WhatsApp.',
    tech: ['Vite', 'TypeScript', 'HTML estático no build', 'AVIF/WebP'],
    result: { kind: 'entrega', value: '4', label: 'etapas na jornada do paciente, da escuta ao acompanhamento' },
    specs: [
      { key: 'Identidade', value: 'paleta tirada da parede vinho e do carvalho da clínica' },
      { key: 'Tratamentos', value: 'ficha com indicação e duração' },
      { key: 'Contato', value: 'agendamento pelo WhatsApp' },
    ],
    year: 2026,
    url: 'https://dra-luiza-negreiros.vercel.app/',
    preview: {
      type: 'screenshot',
      alt: 'Landing page da Dra. Luiza Negreiros — Dermatologia, em desktop e celular',
      desktop: { base: '/src/assets/img/case-luiza-negreiros-desktop', widths: [720, 1440], width: 1440, height: 900 },
      mobile: { base: '/src/assets/img/case-luiza-negreiros-mobile', widths: [240, 480], width: 480, height: 1039 },
    },
  },
  {
    slug: 'instituto-aura',
    title: 'Instituto Aura',
    category: 'Cirurgia Plástica',
    status: 'conceito',
    problem:
      'Leads de anúncios chegavam frios: a equipe passava horas no WhatsApp respondendo curiosos e perguntas de preço, sem tempo para os pacientes certos.',
    solution:
      'Landing pages por procedimento com pré-qualificação em 3 perguntas antes do WhatsApp, dúvidas frequentes e jornada pré e pós-operatória.',
    tech: ['Next.js', 'Meta Pixel + CAPI', 'Google Ads', 'Vercel'],
    result: { kind: 'meta', value: '−40%', label: 'no custo por consulta agendada' },
    specs: [
      { key: 'Mensuração', value: 'Meta Pixel + API de Conversões' },
      { key: 'Pré-qualificação', value: 'três perguntas antes do WhatsApp' },
      { key: 'Carregamento', value: 'abaixo de 2 segundos' },
    ],
    year: 2026,
    preview: {
      type: 'mock',
      brand: 'Instituto Aura',
      eyebrow: 'Cirurgia Plástica',
      headline: 'Naturalidade em cada detalhe.',
      cta: 'Quero uma avaliação',
      palette: { bg: '#0f1720', fg: '#eef2f6', accent: '#c8a97e', muted: '#93a1b0' },
    },
  },
  {
    slug: 'studio-lumi',
    title: 'Studio Lumi',
    category: 'Clínica de Estética',
    status: 'conceito',
    problem:
      'Marca forte no Instagram, mas sem site próprio: pacientes de alto ticket pesquisavam no Google e encontravam a concorrência primeiro.',
    solution:
      'Site institucional com protocolos, equipe com registros profissionais em destaque, perfil do Google otimizado e integração com agenda online.',
    tech: ['Webflow', 'Schema.org', 'Google Business Profile', 'Agenda online'],
    result: { kind: 'meta', value: '3×', label: 'contatos qualificados vindos da busca orgânica' },
    specs: [
      { key: 'Google', value: 'dados estruturados de clínica' },
      { key: 'Performance', value: 'nota 95+ no Lighthouse' },
      { key: 'Agenda', value: 'integrada ao site' },
    ],
    year: 2026,
    preview: {
      type: 'mock',
      brand: 'Studio Lumi',
      eyebrow: 'Estética Avançada',
      headline: 'Beleza com propósito e segurança.',
      cta: 'Agendar consulta',
      palette: { bg: '#fbf3f1', fg: '#3a2a2c', accent: '#a86f7b', muted: '#9a8487' },
    },
  },
];

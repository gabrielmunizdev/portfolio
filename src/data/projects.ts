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
  url?: string;
  preview: ScreenshotPreview | MockPreview;
}

export const projects: readonly Project[] = [
  {
    slug: 'maison-derme',
    title: 'Maison Derme',
    category: 'Clínica Dermatológica',
    status: 'conceito',
    problem:
      'Agenda dependente de indicações e do Instagram. Site antigo, lento e sem páginas por procedimento — invisível para quem busca “dermatologista em Aracaju”.',
    solution:
      'Arquitetura com páginas por procedimento, SEO local, agendamento em um toque pelo WhatsApp e copy alinhada à Resolução CFM 2.336/2023.',
    tech: ['Astro', 'Tailwind CSS', 'Google Business Profile', 'GA4'],
    result: { kind: 'meta', value: '+35%', label: 'agendamentos originados pelo site em 6 meses' },
    specs: [
      { key: 'Carregamento', value: 'abaixo de 2 segundos' },
      { key: 'Performance', value: 'nota 95+ no Lighthouse' },
      { key: 'Páginas', value: 'uma por procedimento' },
    ],
    year: 2026,
    preview: {
      type: 'mock',
      brand: 'Maison Derme',
      eyebrow: 'Dermatologia · Aracaju',
      headline: 'Pele saudável, guiada pela ciência.',
      cta: 'Agendar avaliação',
      palette: { bg: '#f5efe8', fg: '#2b2420', accent: '#9c6b4e', muted: '#8a7d72' },
    },
  },
  {
    slug: 'christian-silva',
    title: 'Christian Silva — Assessoria Imigratória',
    category: 'Consultoria Premium',
    status: 'cliente',
    problem:
      'Serviço de alto ticket que precisava transmitir segurança e autoridade para leads que nunca conheceram o consultor pessoalmente.',
    solution:
      'Site institucional com narrativa de autoridade, explicação do processo, depoimentos e CTA de WhatsApp presente em todas as dobras.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Vercel'],
    result: { kind: 'entrega', value: '1 toque', label: 'do primeiro clique à conversa no WhatsApp' },
    specs: [
      { key: 'Construção', value: 'React + Vite' },
      { key: 'Hospedagem', value: 'Vercel, rede global' },
      { key: 'Contato', value: 'WhatsApp em todas as dobras' },
    ],
    year: 2025,
    url: 'https://christiansilva.vercel.app/',
    preview: {
      type: 'screenshot',
      alt: 'Página inicial do site Christian Silva — Assessoria Imigratória, em desktop e celular',
      desktop: { base: '/src/assets/img/case-christian-silva-desktop', widths: [720, 1440], width: 1440, height: 900 },
      mobile: { base: '/src/assets/img/case-christian-silva-mobile', widths: [240, 480], width: 480, height: 1039 },
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

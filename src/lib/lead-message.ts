import { site } from '../data/site';

export const leadGoals = [
  'Mais agendamentos',
  'Site novo ou redesign',
  'Landing page para anúncios',
  'Reposicionar a marca',
] as const;

/** Segmentos que não são clínicas recebem "meu negócio" em vez de "minha clínica". */
const NON_CLINIC_SEGMENTS = new Set(['Negócios Premium']);

export interface LeadAnswers {
  segment?: string;
  goal?: string;
  name?: string;
}

export function composeLeadMessage({ segment, goal, name }: LeadAnswers): string {
  let message: string = site.whatsapp.defaultMessage;
  if (segment && NON_CLINIC_SEGMENTS.has(segment)) {
    message = message.replace('da minha clínica', 'do meu negócio');
  }
  const details = [
    name?.trim() && `Nome: ${name.trim()}`,
    segment && `Segmento: ${segment}`,
    goal && `Objetivo: ${goal}`,
  ].filter(Boolean);
  return details.length ? `${message}\n\n${details.join('\n')}` : message;
}

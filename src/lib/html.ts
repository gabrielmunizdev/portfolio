/**
 * Template tag mínimo para componentes renderizados em build.
 * Interpola valores com escape automático; use `raw()` (ou outro `html`) para inserir markup confiável.
 */
export interface Html {
  readonly __html: string;
}

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export const escape = (value: string): string => value.replace(/[&<>"']/g, (c) => ESCAPES[c]);

export const raw = (markup: string): Html => ({ __html: markup });

const isHtml = (value: unknown): value is Html =>
  typeof value === 'object' && value !== null && '__html' in value;

function stringify(value: unknown): string {
  if (value === null || value === undefined || value === false) return '';
  if (Array.isArray(value)) return value.map(stringify).join('');
  if (isHtml(value)) return value.__html;
  return escape(String(value));
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): Html {
  let out = strings[0];
  values.forEach((value, i) => {
    out += stringify(value) + strings[i + 1];
  });
  return raw(out);
}

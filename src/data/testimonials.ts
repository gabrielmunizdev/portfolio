export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

/**
 * Depoimentos de clientes. Só entram relatos reais e autorizados de clínicas/médicos — a seção some
 * enquanto a lista estiver vazia. Os anteriores (automação, chatbot, dashboard) eram de fora do nicho.
 */
export const testimonials: readonly Testimonial[] = [];

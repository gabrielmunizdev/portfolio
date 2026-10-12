# Gabriel Muniz — Portfólio

Site one-page de [gabrielmunizdev.site](https://gabrielmunizdev.site): sites de alto padrão para clínicas e negócios premium.

Vite + TypeScript, sem framework de UI. Os componentes são funções que retornam HTML e rodam **em build** (plugin em `vite.config.ts`), então a página publicada é HTML estático com ~2 KB de JS para interações.

## Comandos

```bash
npm install
npm run dev        # servidor local em http://localhost:3000
npm run build      # type-check + build de produção em dist/
npm run preview    # serve o build
npm run images     # gera .avif/.webp responsivos a partir de src/img
npm run contrast   # verifica contraste WCAG AA dos tokens de cor
npm run capture-case -- <url> <nome>   # screenshots desktop + mobile de um case
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, e-mail, Calendly, redes, métricas do Hero | `src/data/site.ts` |
| Cases do portfólio | `src/data/projects.ts` |
| Depoimentos | `src/data/testimonials.ts` |
| Método e FAQ | `src/data/content.ts` |
| Cores, tipografia, espaçamentos (temas escuro/claro) | `src/styles/tokens.css` |

### Adicionar um case real

1. `npm run capture-case -- https://site-do-cliente.com.br nome-do-case`
2. Inclua o par em `IMAGES` dentro de `scripts/optimize-images.mjs` e rode `npm run images`.
3. Adicione o objeto em `src/data/projects.ts` com `status: 'cliente'` e `preview.type: 'screenshot'`.
   Use `result.kind: 'resultado'` somente para métricas medidas (GA4, CRM, agenda).

## Estrutura

```
src/
  components/   seções da página (header, hero, cases, depoimentos, faq, contato…)
  data/         conteúdo tipado
  lib/          template `html` com escape e montagem da mensagem do WhatsApp
  scripts/      comportamento no navegador (tema, reveal, CTA fixo, carrossel, fluxo de contato)
  styles/       tokens, base, layout, componentes e movimento
  render.ts     composição da página + dados estruturados (JSON-LD)
public/         favicons, manifest, og-image, robots.txt, sitemap.xml
```

import { defineConfig, type Plugin } from 'vite';
import { renderPage } from './src/render';

/**
 * Substitui os marcadores `<!--render:nome-->` do index.html pelo markup dos componentes.
 * Roda antes do processamento de assets do Vite, então caminhos /src/... em src/srcset
 * são resolvidos e recebem hash normalmente. Alterações em src/ reiniciam o dev server
 * (dependências do config).
 */
function staticRender(): Plugin {
  return {
    name: 'static-render',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const sections = renderPage();
        return html.replace(/<!--render:([\w-]+)-->/g, (_marker, name: string) => {
          if (!(name in sections)) throw new Error(`Seção desconhecida no index.html: ${name}`);
          return sections[name];
        });
      },
    },
  };
}

export default defineConfig({
  plugins: [staticRender()],
  server: { port: 3000, host: '0.0.0.0' },
  build: {
    target: 'es2020',
  },
});

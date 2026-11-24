import { defineConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';

const pages = readdirSync('.', { withFileTypes: true })
  .filter((d) => d.isDirectory() && !['dist', 'node_modules', 'public', 'src'].includes(d.name) && existsSync(`${d.name}/index.html`))
  .map((d) => `${d.name}/index.html`);

export default defineConfig({
  base: '/',
  appType: 'mpa',
  build: { target: 'es2020', cssMinify: true, assetsInlineLimit: 2048, rollupOptions: { input: ['index.html', '404.html', ...pages].filter(existsSync) } },
});

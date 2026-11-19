// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://jesus-calles.vercel.app',
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  integrations: [icon()],
  vite: {
    // Pre-bundle three at startup: it is only reached through a lazy dynamic
    // import, so Vite would otherwise discover it mid-session and answer
    // 504 "Outdated Optimize Dep" until the page is reloaded after a re-optimize.
    optimizeDeps: { include: ['three'] }
  }
});

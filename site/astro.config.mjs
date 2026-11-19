// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://jesuscalles.dev',
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  integrations: [icon()]
});

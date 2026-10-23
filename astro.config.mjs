import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'ru'],
    routing: 'manual',
  },
});

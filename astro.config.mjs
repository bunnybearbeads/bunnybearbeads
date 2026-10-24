import { defineConfig } from 'astro/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateMissingPosters } from './scripts/generate-posters.mjs';

/**
 * AI: Автоматическая генерация постеров (.jpg) для любых .mp4/.webm в каталоге товаров.
 * Срабатывает на этапе настройки конфигурации (при `astro dev` и `astro build`).
 * Создает .jpg рядом с видео, чтобы галерея использовала легковесные <img> в миниатюрах.
 */
function autoVideoPosters() {
  return {
    name: 'auto-video-posters',
    hooks: {
      'astro:config:setup': async ({ logger }) => {
        await generateMissingPosters('./public/images/products', logger);
      },
    },
  };
}

function materialIconsSubset() {
  return {
    name: 'material-icons-subset',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distPath = fileURLToPath(dir);
        const htmlFiles = [];

        async function walk(currentDir) {
          const entries = await fs.readdir(currentDir, { withFileTypes: true });
          for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
              await walk(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
              htmlFiles.push(fullPath);
            }
          }
        }

        await walk(distPath);

        const iconSet = new Set();
        const iconTagRegex = /class=["'][^"']*\bicon\b[^"']*["'][^>]*>\s*([a-z0-9_]+)\s*</gi;

        for (const file of htmlFiles) {
          const content = await fs.readFile(file, 'utf8');
          let match;
          while ((match = iconTagRegex.exec(content)) !== null) {
            iconSet.add(match[1].toLowerCase());
          }
        }

        if (iconSet.size === 0) {
          logger.info('No Material Icons found in build output.');
          return;
        }

        // Google Fonts requires icon_names to be sorted alphabetically
        const sortedIcons = Array.from(iconSet).sort().join(',');
        logger.info(`Subsetted ${iconSet.size} Material Icon(s): ${sortedIcons}`);

        for (const file of htmlFiles) {
          const content = await fs.readFile(file, 'utf8');
          const updated = content.replace(
            /(https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Rounded:[^"']+?)(&display=block)/g,
            `$1&icon_names=${sortedIcons}$2`
          );
          if (updated !== content) {
            await fs.writeFile(file, updated, 'utf8');
          }
        }
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
  },
  integrations: [autoVideoPosters(), materialIconsSubset()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'ru'],
    routing: 'manual',
  },
});

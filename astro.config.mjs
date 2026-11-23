import { defineConfig } from 'astro/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exportData, watchData } from './scripts/export-data.mjs';
import { reportBuildSize } from './scripts/build-size.mjs';

/**
 * База изделий (data/ → Dropbox) → src/content/ и public/images/products/. Подробно — в scripts/export-data.mjs.
 * Любая проблема в базе роняет сборку. В dev ещё и следит за data/, так что правки в Dropbox сразу видны на сайте.
 */
function productData() {
  return {
    name: 'product-data',
    hooks: {
      'astro:config:setup': async ({ logger }) => {
        await exportData(logger);
      },
      'astro:server:setup': ({ logger }) => {
        watchData(logger);
      },
    },
  };
}

/** После сборки — размер dist/ и прирост с прошлой сборки (scripts/build-size.mjs) */
function buildSize() {
  return {
    name: 'build-size',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        await reportBuildSize(fileURLToPath(dir), logger);
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
  site: 'https://bunnybearbeads.com',
  server: {
    host: true,
  },
  integrations: [productData(), materialIconsSubset(), buildSize()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'ru'],
    routing: 'manual',
  },
});

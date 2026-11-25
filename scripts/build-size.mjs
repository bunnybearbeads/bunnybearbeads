/**
 * Отчёт о размере сборки: сколько весит dist/, из чего состоит, насколько вырос с прошлой сборки.
 * Вызывается после `astro build` (интеграция в astro.config.mjs).
 *
 * Лимиты GitHub Pages: сайт — до 1 ГБ, один файл — до 100 МБ (больше git не даст запушить).
 * Прошлый размер хранится в node_modules/.cache — вне git, только на этом компьютере.
 */
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HISTORY_FILE = path.join(ROOT, 'node_modules/.cache/bunnybearbeads/build-size.json');

export const SITE_LIMIT = 1024 ** 3;
export const FILE_LIMIT = 100 * 1024 ** 2;
const SITE_WARN = 0.8 * SITE_LIMIT;

const GROUPS = [
  ['images', /\.(jpe?g|png|webp|avif|gif|svg|ico)$/i],
  ['video', /\.(mp4|webm|ogg|mov)$/i],
  ['code', /\.(html|css|js|mjs|json|xml|txt|webmanifest)$/i],
  ['fonts', /\.(woff2?|ttf|otf)$/i],
];

/** Жирный в терминале; в файл или без цвета (NO_COLOR) — как есть */
const bold = (text) => (process.stdout.isTTY && !process.env.NO_COLOR ? `\x1b[1m${text}\x1b[22m` : text);

export function formatSize(bytes) {
  const abs = Math.abs(bytes);
  if (abs >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} ГБ`;
  if (abs >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} МБ`;
  return `${Math.round(bytes / 1024)} КБ`;
}

export async function listFiles(dir) {
  const files = [];
  const walk = async (current) => {
    for (const entry of await fsp.readdir(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '.git') await walk(fullPath);
      } else if (entry.isFile()) {
        files.push({ path: path.relative(dir, fullPath), size: (await fsp.stat(fullPath)).size });
      }
    }
  };
  await walk(dir);
  return files;
}

export async function reportBuildSize(distDir, logger = console) {
  const files = await listFiles(distDir);
  const total = files.reduce((sum, f) => sum + f.size, 0);

  const groups = new Map([...GROUPS.map(([name]) => [name, 0]), ['other', 0]]);
  for (const file of files) {
    const group = GROUPS.find(([, re]) => re.test(file.path))?.[0] ?? 'other';
    groups.set(group, groups.get(group) + file.size);
  }

  const previous = JSON.parse(await fsp.readFile(HISTORY_FILE, 'utf8').catch(() => 'null'));
  const delta = previous ? total - previous.total : null;
  const deltaText = delta === null ? '' : ` (${delta >= 0 ? '+' : '−'}${formatSize(Math.abs(delta))} с прошлой сборки)`;

  const largest = [...files].sort((a, b) => b.size - a.size).slice(0, 5);

  logger.info(`dist: ${bold(formatSize(total))}, файлов: ${files.length}${deltaText}`);
  logger.info(`  ${[...groups].map(([name, size]) => `${name} ${formatSize(size)}`).join(' · ')}`);
  logger.info(`  самые большие: ${largest.map((f) => `${f.path} ${formatSize(f.size)}`).join(', ')}`);

  if (total > SITE_WARN) {
    logger.warn(`dist — ${Math.round((total / SITE_LIMIT) * 100)}% от лимита GitHub Pages (1 ГБ)`);
  }
  for (const file of files.filter((f) => f.size > FILE_LIMIT)) {
    logger.warn(`${file.path} — ${formatSize(file.size)}: GitHub не принимает файлы больше 100 МБ`);
  }

  fs.mkdirSync(path.dirname(HISTORY_FILE), { recursive: true });
  await fsp.writeFile(HISTORY_FILE, JSON.stringify({ total, date: new Date().toISOString() }));
}

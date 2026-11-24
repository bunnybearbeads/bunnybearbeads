/**
 * `npm run dev:restart` — перезапуск dev-сервера с чистым кэшем контента.
 *
 * Нужен после правок схемы (src/content.config.ts), переименования полей и т. п.: Astro хранит
 * разобранные товары в data-store.json и при совпадении файлов берёт их оттуда по старой схеме —
 * страницы отдают 404 или падают. Удаляем кэш и запускаем сервер заново.
 *
 * Вне терминала (из скриптов, у Claude) Astro 7 сам уходит в фон: управлять им — `npx astro dev stop | status | logs`.
 * В терминале сервер остаётся на переднем плане, как обычный `npm run dev`.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' };

// Фоновый сервер останавливается сам; запущенный в другом терминале — тоже (astro dev stop находит его по pid)
spawnSync('npx', ['astro', 'dev', 'stop'], { cwd: ROOT, env, stdio: 'ignore' });

for (const file of ['.astro/data-store.json', 'node_modules/.astro/data-store.json']) {
  fs.rmSync(path.join(ROOT, file), { force: true });
}

const result = spawnSync('npx', ['astro', 'dev'], { cwd: ROOT, env, stdio: 'inherit' });
process.exit(result.status ?? 0);

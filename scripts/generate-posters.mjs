import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';

/**
 * AI: Автоматическая генерация постеров (.jpg) для всех видео в каталоге товаров.
 * При сборке или запуске dev-сервера скрипт находит любые видео (.mp4/.webm/.mov),
 * проверяет наличие файла постера рядом и, если его нет, извлекает кадр через ffmpeg-static.
 * Это избавляет от необходимости делать постеры вручную и позволяет использовать
 * лёгкие, нативные <img> в тумбочках галереи вместо тяжелых тегов <video>.
 */
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.ogg', '.mov']);

export async function generateMissingPosters(dir = './public/images/products', logger = console) {
  if (!existsSync(dir)) return;

  const videoFiles = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (VIDEO_EXTENSIONS.has(ext)) {
          videoFiles.push(fullPath);
        }
      }
    }
  }

  await walk(dir);

  for (const videoPath of videoFiles) {
    const ext = path.extname(videoPath);
    const posterPath = videoPath.slice(0, -ext.length) + '.jpg';

    if (!existsSync(posterPath)) {
      try {
        const relVideo = path.relative(process.cwd(), videoPath);
        const relPoster = path.relative(process.cwd(), posterPath);
        logger.info(`[video-posters] Generating poster: ${relVideo} -> ${relPoster}`);
        execFileSync(
          ffmpegPath,
          [
            '-y',
            '-ss',
            '00:00:00.1',
            '-i',
            videoPath,
            '-frames:v',
            '1',
            '-update',
            '1',
            '-q:v',
            '2',
            posterPath,
          ],
          { stdio: 'ignore' }
        );
        logger.info(`[video-posters] Created: ${relPoster}`);
      } catch (err) {
        logger.error(`[video-posters] Failed to generate poster for ${videoPath}:`, err);
      }
    }
  }
}

// Standalone execution: `node scripts/generate-posters.mjs`
if (process.argv[1] && process.argv[1].endsWith('generate-posters.mjs')) {
  generateMissingPosters().then(() => {
    console.log('[video-posters] Done.');
  });
}

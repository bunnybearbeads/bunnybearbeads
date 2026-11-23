/**
 * Публикация сайта: `npm run deploy`.
 *
 * Собирает сайт локально (база изделий в Dropbox видна только здесь) и выкладывает dist/
 * в ветку gh-pages одним коммитом с force push. История ветки не копится, репозиторий не растёт.
 * GitHub Pages берёт сайт из этой ветки (Settings → Pages → Deploy from a branch → gh-pages, / (root)).
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FILE_LIMIT, formatSize, listFiles } from './build-size.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const BRANCH = 'gh-pages';

const git = (args, cwd = ROOT) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

function fail(message) {
  console.error(`\ndeploy: ${message}`);
  process.exit(1);
}

const remote = git(['remote', 'get-url', 'origin']);
const commit = git(['rev-parse', '--short', 'HEAD']);
const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
const dirty = git(['status', '--porcelain']) !== '';
if (dirty) console.warn('deploy: there are uncommitted changes, they will be published too');

const build = spawnSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' });
if (build.status !== 0) fail('build failed, nothing was published');

const tooLarge = (await listFiles(DIST)).filter((f) => f.size > FILE_LIMIT);
if (tooLarge.length) {
  fail(`GitHub does not accept files over 100 MB:\n${tooLarge.map((f) => `  ${f.path} ${formatSize(f.size)}`).join('\n')}`);
}

// Без .nojekyll GitHub Pages прогоняет ветку через Jekyll, и папка _astro/ пропадает
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');

const name = git(['config', 'user.name']);
const email = git(['config', 'user.email']);
const message = `Deploy ${commit}${dirty ? '-dirty' : ''} from ${branch}, ${new Date().toISOString()}`;

fs.rmSync(path.join(DIST, '.git'), { recursive: true, force: true });
try {
  git(['init', '-q', '-b', BRANCH], DIST);
  git(['add', '-A'], DIST);
  git(['-c', `user.name=${name}`, '-c', `user.email=${email}`, 'commit', '-q', '-m', message], DIST);
  execFileSync('git', ['push', '--force', remote, `${BRANCH}:${BRANCH}`], { cwd: DIST, stdio: 'inherit' });
} finally {
  fs.rmSync(path.join(DIST, '.git'), { recursive: true, force: true });
}

console.log(`\ndeploy: published ${commit}${dirty ? ' (with uncommitted changes)' : ''} to ${BRANCH}`);

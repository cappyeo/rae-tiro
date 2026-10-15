import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const preservedApp = join(projectRoot, 'preserved', 'app');
const compiledRoot = join(projectRoot, 'src', 'compiled');
const distApp = join(projectRoot, 'dist', 'app');

function ensureCompiledSnapshot() {
  const sourceVite = join(preservedApp, '.vite');
  const editableVite = join(compiledRoot, '.vite');
  if (!existsSync(editableVite)) {
    mkdirSync(compiledRoot, { recursive: true });
    cpSync(sourceVite, editableVite, { recursive: true });
    writeFileSync(
      join(compiledRoot, 'README.md'),
      '# Recovered compiled sources\n\nThese files are editable copies of the shipped `.vite` bundles. Original TypeScript source names and project source are not restored by this snapshot.\n',
      'utf8',
    );
  }
}

function writeManifest() {
  writeFileSync(
    join(distApp, 'package.json'),
    `${JSON.stringify({
      name: 'tiro-recovered-runtime',
      productName: 'Tiro',
      version: '4.9.14',
      private: true,
      main: '.vite/build/index.js',
    }, null, 2)}\n`,
    'utf8',
  );
}

ensureCompiledSnapshot();
rmSync(distApp, { recursive: true, force: true });
mkdirSync(distApp, { recursive: true });

cpSync(join(compiledRoot, '.vite'), join(distApp, '.vite'), { recursive: true });
if (existsSync(join(preservedApp, 'node_modules'))) {
  cpSync(join(preservedApp, 'node_modules'), join(distApp, 'node_modules'), { recursive: true });
}
writeManifest();

const required = [
  join(distApp, '.vite', 'build', 'index.js'),
  join(distApp, '.vite', 'build', 'preload.js'),
  join(distApp, '.vite', 'renderer', 'main_window', 'index.html'),
];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  throw new Error(`Recovered build is incomplete; missing: ${missing.map((file) => relative(projectRoot, file)).join(', ')}`);
}

console.log(`Built ${relative(projectRoot, distApp)} from editable recovered bundles.`);

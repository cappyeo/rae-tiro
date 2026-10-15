import { cpSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const application = join(root, 'recovered', 'sourcemaps', 'application');
const source = join(application, 'src');
const vendorModules = join(root, 'recovered', 'sourcemaps', 'vendor', 'node_modules');
const packagedModules = join(root, 'preserved', 'app', 'node_modules');
const out = join(root, 'dist', 'source-app');
const compiledRenderer = join(root, 'src', 'compiled', '.vite', 'renderer');
const envDefaults = {
  api: process.env.VITE_API_BASE_URL ?? 'https://api.tiro.ooo',
  web: process.env.VITE_WEB_BASE_URL ?? 'https://tiro.ooo',
  ws: process.env.VITE_WS_BASE_URL ?? 'wss://api.tiro.ooo',
  docs: process.env.VITE_DOCS_BASE_URL ?? 'https://docs.tiro.ooo',
  channelTalk: process.env.VITE_CHANNEL_TALK_PLUGIN_KEY ?? '5d873410-56f4-4504-8497-b1ca2f13a8a9',
  appEnv: process.env.VITE_APP_ENV ?? 'production',
};

const localeRecovery = spawnSync(process.execPath, [join(root, 'scripts', 'recover-locales.mjs')], {
  cwd: root,
  stdio: 'inherit',
});
if (localeRecovery.status !== 0) throw new Error('Locale recovery failed.');

function resolveSourcePath(path) {
  for (const candidate of [path, `${path}.ts`, `${path}.tsx`, `${path}.js`, join(path, 'index.ts')]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return path;
}

if (!existsSync(source) || !existsSync(compiledRenderer)) {
  throw new Error('Recovered source tree or editable renderer bundle is missing.');
}

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, '.vite', 'build'), { recursive: true });

const aliasPlugin = {
  name: 'recovered-source-aliases',
  setup(api) {
    api.onResolve({ filter: /^@\/./ }, (args) => ({
      path: resolveSourcePath(join(source, args.path.slice(2))),
    }));
    api.onResolve({ filter: /^@plato-corp\/tiro-core\/entities\/calendar$/ }, () => ({
      path: join(application, 'packages', 'core', 'dist', 'entities', 'calendar.mjs'),
    }));
    api.onResolve({ filter: /^\.\.\/\.\.\/package\.json$/ }, () => ({
      path: join(root, 'preserved', 'app', 'package.json'),
    }));
  },
};

const common = {
  bundle: true,
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  target: 'node20',
  absWorkingDir: root,
  nodePaths: [packagedModules, vendorModules, join(root, 'node_modules')],
  plugins: [aliasPlugin],
  external: ['electron', '@plato-corp/microphone'],
  define: {
    MAIN_WINDOW_VITE_DEV_SERVER_URL: 'false',
    MAIN_WINDOW_VITE_NAME: JSON.stringify('main_window'),
    'import.meta.env.PROD': 'true',
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(envDefaults.api),
    'import.meta.env.VITE_WEB_BASE_URL': JSON.stringify(envDefaults.web),
    'import.meta.env.VITE_WS_BASE_URL': JSON.stringify(envDefaults.ws),
    'import.meta.env.VITE_DOCS_BASE_URL': JSON.stringify(envDefaults.docs),
    'import.meta.env.VITE_CHANNEL_TALK_PLUGIN_KEY': JSON.stringify(envDefaults.channelTalk),
    'process.env.VITE_API_BASE_URL': JSON.stringify(envDefaults.api),
    'process.env.VITE_WEB_BASE_URL': JSON.stringify(envDefaults.web),
    'process.env.VITE_WS_BASE_URL': JSON.stringify(envDefaults.ws),
    'process.env.VITE_DOCS_BASE_URL': JSON.stringify(envDefaults.docs),
    'process.env.VITE_APP_ENV': JSON.stringify(envDefaults.appEnv),
  },
  logLevel: 'info',
};

for (const [entry, outfile] of [
  ['main/index.ts', 'index.js'],
  ['main/preload.ts', 'preload.js'],
  ['main/notificationPreload.ts', 'notificationPreload.js'],
  ['main/overlayPreload.ts', 'overlayPreload.js'],
]) {
  await build({
    ...common,
    entryPoints: [join(source, entry)],
    outfile: join(out, '.vite', 'build', outfile),
  });
}

cpSync(compiledRenderer, join(out, '.vite', 'renderer'), { recursive: true });
cpSync(packagedModules, join(out, 'node_modules'), { recursive: true });
writeFileSync(join(out, 'package.json'), `${JSON.stringify({
  name: 'tiro-recovered-source-runtime',
  productName: 'Tiro',
  version: '4.9.14',
  private: true,
  main: '.vite/build/index.js',
}, null, 2)}\n`);

console.log(`Built TypeScript main/preload entries to ${out}`);
writeFileSync(join(root, 'evidence', 'source-build.json'), `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  entryPoints: ['main/index.ts', 'main/preload.ts', 'main/notificationPreload.ts', 'main/overlayPreload.ts'],
  renderer: 'src/compiled/.vite/renderer',
  output: 'dist/source-app',
  esbuild: '0.25.12',
  target: 'node20',
  format: 'cjs',
  aliases: ['@ -> recovered/sourcemaps/application/src', '@plato-corp/tiro-core/entities/calendar -> recovered application/packages/core/dist/entities/calendar.mjs'],
  external: ['electron', '@plato-corp/microphone'],
  envDefaults: envDefaults,
}, null, 2)}\n`);

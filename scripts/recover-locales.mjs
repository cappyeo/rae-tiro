import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const preservedBuild = join(root, 'preserved', 'app', '.vite', 'build');
const outputs = [
  ['en', 'common-BYp7ijXW.js'],
  ['ja', 'common-d8iTTsZZ.js'],
  ['ko', 'common-ESyrnCuW.js'],
];

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const records = [];
for (const [locale, chunk] of outputs) {
  const sourcePath = join(preservedBuild, chunk);
  const sourceBytes = readFileSync(sourcePath);
  const translations = require(`${sourcePath}`).default;
  const outputBytes = Buffer.from(`${JSON.stringify(translations)}\n`, 'utf8');
  const outputPaths = [
    join(root, 'recovered', 'sourcemaps', 'application', 'src', 'locales', 'dist', locale, 'common.json'),
    join(root, 'recovered', 'packages', 'locales', 'src', locale, 'common.json'),
    join(root, 'recovered', 'sourcemaps', 'application', 'packages', 'locales', 'src', locale, 'common.json'),
  ];
  for (const outputPath of outputPaths) {
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, outputBytes);
  }
  records.push({
    locale,
    source: `preserved/app/.vite/build/${chunk}`,
    sourceSha256: sha256(sourceBytes),
    outputSha256: sha256(outputBytes),
    outputBytes: outputBytes.length,
    outputs: outputPaths.map((path) => path.slice(root.length + 1).replaceAll('\\', '/')),
  });
}

const evidencePath = join(root, 'evidence', 'locale-recovery.json');
mkdirSync(dirname(evidencePath), { recursive: true });
writeFileSync(evidencePath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  method: 'require captured CJS locale chunks and serialize their default export',
  records,
}, null, 2)}\n`);
console.log(`Recovered ${records.length} locales and wrote ${evidencePath}`);

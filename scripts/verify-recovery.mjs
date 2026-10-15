import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';
import { compareFormattedFiles, canonicalRegexFlags } from './compare-formatted.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const readJSON = path => JSON.parse(readFileSync(path, 'utf8'));
const extraction = readJSON(join(root, 'evidence/asar-extraction.json'));
const recovery = readJSON(join(root, 'evidence/source-recovery.json'));
const errors = [];
let preserved = 0;
let sourceFiles = 0;
for (const file of extraction.normalized_result.artifacts) {
  const target = resolve(root, 'preserved/app', file.relative_path);
  if (relative(join(root, 'preserved/app'), target).startsWith('..')) throw new Error('Unsafe manifest path.');
  if (!existsSync(target) || sha(readFileSync(target)) !== file.sha256) errors.push(`Preserved bytes changed: ${file.relative_path}`);
  else preserved++;
}
const seen = new Set();
for (const record of recovery.records) {
  if (!['recovered', 'deduplicated', 'collision-renamed'].includes(record.status)) continue;
  if (!record.output || seen.has(record.output)) continue;
  seen.add(record.output);
  const file = resolve(root, 'recovered/sourcemaps', record.output);
  if (relative(join(root, 'recovered/sourcemaps'), file).startsWith('..')) throw new Error('Unsafe source path.');
  if (!existsSync(file) || sha(readFileSync(file)) !== record.contentSha256) errors.push(`Embedded source changed: ${record.output}`);
  else sourceFiles++;
}
const editable = join(root, 'src/compiled/.vite');
const originals = join(root, 'preserved/app/.vite');
const codeFiles = [];
function collect(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, item.name);
    if (item.isDirectory()) collect(file);
    else if (/\.(js|css)$/.test(file)) codeFiles.push(file);
  }
}
collect(editable);
const fingerprints = [];
for (const file of codeFiles) {
  const logical = relative(editable, file);
  const loader = file.endsWith('.css') ? 'css' : 'js';
  const options = { loader, minify: true, legalComments: 'none', charset: 'utf8', target: 'esnext' };
  const left = await transform(readFileSync(join(originals, logical), 'utf8'), options);
  const right = await transform(readFileSync(file, 'utf8'), options);
  let equal = left.code === right.code;
  let comparisonKind = equal ? 'exact-normalized' : 'different';
  let original = sha(left.code);
  let editableHash = sha(right.code);
  if (!equal && loader === 'js') {
    const leftRegex = canonicalRegexFlags(left.code);
    const rightRegex = canonicalRegexFlags(right.code);
    equal = leftRegex === rightRegex;
    comparisonKind = 'parsed-regex-flag-order-normalized';
    original = sha(leftRegex);
    editableHash = sha(rightRegex);
  }
  if (!equal && loader === 'css') {
    const formatted = await compareFormattedFiles(
      join(originals, logical),
      file,
      loader,
    );
    equal = formatted.equal;
    comparisonKind = formatted.comparisonKind;
    original = formatted.original;
    editableHash = formatted.editable;
  }
  fingerprints.push({ file: logical.replaceAll('\\', '/'), equal, comparisonKind, original, editable: editableHash });
  if (!equal) errors.push(`Formatted code fingerprint differs: ${logical}`);
}
const html = readFileSync(join(editable, 'renderer/main_window/index.html'), 'utf8');
const missingAssets = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
  .map(match => match[1]).filter(url => url.startsWith('./') && !existsSync(resolve(editable, 'renderer/main_window', url)));
if (missingAssets.length) errors.push(`Missing HTML assets: ${missingAssets.join(', ')}`);
const report = {
  timestamp: new Date().toISOString(), passed: errors.length === 0,
  preservedFilesVerified: preserved, uniqueEmbeddedSourcesVerified: sourceFiles,
  formattedCodeFiles: fingerprints.length, fingerprints, missingAssets, errors,
  limitations: ['Code fingerprints compare normalized syntax using one fixed esbuild version; they do not prove runtime equivalence.', 'Source hashes are the recovery baseline. Expected user edits change them.', 'No cloud authentication, audio capture, upload or native-helper behavior is tested.'],
};
writeFileSync(join(root, 'evidence/recovery-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, fingerprints: undefined }, null, 2));
process.exitCode = report.passed ? 0 : 1;


import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = label => JSON.parse(readFileSync(resolve(root, `evidence/smoke-${label}.json`), 'utf8'));
const [leftLabel = 'preserved', rightLabel = 'recovered'] = process.argv.slice(2);
if (![leftLabel, rightLabel].every(s => /^[a-z0-9-]+$/.test(s))) throw new Error('Invalid label.');
const left = read(leftLabel);
const right = read(rightLabel);
const fields = ['text', 'rootChildren', 'electronBridge', 'version', 'bridgeMembers', 'readOnlyIpc', 'imageFailures'];
const failures = [];
for (const key of fields) {
  try { assert.deepEqual(left.renderer?.[key], right.renderer?.[key]); }
  catch { failures.push(`Renderer startup field differs: ${key}`); }
}
for (const [label, item] of [[leftLabel, left], [rightLabel, right]]) {
  if (!item.passed || item.errors.length > 0 || item.network !== 'blocked') failures.push(`Startup gates failed: ${label}`);
}
const digest = label => createHash('sha256').update(readFileSync(resolve(root, `evidence/smoke-${label}.png`))).digest('hex');
const leftImageSha256 = digest(leftLabel);
const rightImageSha256 = digest(rightLabel);
const screenshotIdentical = leftImageSha256 === rightImageSha256;
const result = { timestamp: new Date().toISOString(), labels: [leftLabel, rightLabel], passed: failures.length === 0,
  comparableFields: fields, screenshotIdentical, leftImageSha256, rightImageSha256, failures,
  scope: 'Offline unauthenticated startup on stock Electron 41.8.0 with the recovery launcher. This does not establish equivalence after login or native audio behavior.' };
writeFileSync(resolve(root, 'evidence/startup-comparison.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.passed ? 0 : 1;


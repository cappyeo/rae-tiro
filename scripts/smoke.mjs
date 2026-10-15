import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const index = args.indexOf('--label');
const label = index >= 0 ? args[index + 1] : 'recovered';
if (!/^[a-z0-9-]+$/.test(label ?? '')) throw new Error('Invalid smoke label.');
const env = { ...process.env, NODE_ENV: 'test' };
delete env.ELECTRON_RUN_AS_NODE;
delete env.TIRO_DESKTOP_AI;
const child = spawn(require('electron'), [resolve(root, 'scripts/runtime.cjs'), '--smoke', ...args], {
  cwd: root, env, stdio: 'inherit', windowsHide: true,
});
const timer = setTimeout(() => { child.kill(); console.error('Smoke process exceeded 55 seconds.'); }, 55_000);
child.on('error', error => { console.error(error.message); clearTimeout(timer); process.exitCode = 1; });
child.on('exit', code => {
  clearTimeout(timer);
  if (code !== 0) { process.exitCode = code ?? 1; return; }
  const report = JSON.parse(readFileSync(resolve(root, `evidence/smoke-${label}.json`), 'utf8'));
  console.log(JSON.stringify({ passed: report.passed, label, renderer: report.renderer, errors: report.errors }, null, 2));
  process.exitCode = report.passed ? 0 : 1;
});


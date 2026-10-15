import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const executable = require('electron');
if (!existsSync(resolve(root, 'dist/source-app/package.json'))) {
  throw new Error('Run npm run build first.');
}
const env = { ...process.env, NODE_ENV: 'test' };
delete env.ELECTRON_RUN_AS_NODE;
delete env.TIRO_DESKTOP_AI;
const child = spawn(executable, [resolve(root, 'scripts/runtime.cjs'), ...process.argv.slice(2)], {
  cwd: root, env, stdio: 'inherit', windowsHide: true,
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });


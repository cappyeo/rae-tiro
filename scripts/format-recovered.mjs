import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const compiledRoot = join(projectRoot, 'src', 'compiled');

if (!existsSync(compiledRoot)) {
  throw new Error('src/compiled does not exist. Run `npm run build` once to create the editable snapshot.');
}

const files = [];
async function collect(directory) {
  const { readdir } = await import('node:fs/promises');
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(?:js|mjs|cjs|css|html)$/.test(entry.name) && !entry.name.endsWith('.map')) files.push(path);
  }
}

await collect(compiledRoot);
for (const file of files) {
  const source = await import('node:fs/promises').then(({ readFile }) => readFile(file, 'utf8'));
  const formatted = await prettier.format(source, {
    filepath: file,
    parser: file.endsWith('.html') ? 'html' : file.endsWith('.css') ? 'css' : 'babel',
  });
  await import('node:fs/promises').then(({ writeFile }) => writeFile(file, formatted, 'utf8'));
}
console.log(`Formatted ${files.length} recovered bundle files under src/compiled.`);

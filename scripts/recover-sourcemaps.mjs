#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const recoveryRoot = path.resolve(scriptRoot, '..');

function fail(message) {
  throw new Error(message);
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function absolute(value, name) {
  if (!value || !path.isAbsolute(value)) fail(`${name} must be an absolute path`);
  return path.resolve(value);
}

function inside(root, target) {
  const relative = path.relative(root, target);
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function normaliseForOutput(source) {
  let value = String(source ?? '').replaceAll('\\', '/');
  value = value.replace(/^[a-z]+:\/\//i, '');
  value = value.replace(/^\/+/, '');
  const parts = value.split('/').filter((part) => part && part !== '.');
  while (parts[0] === '..') parts.shift();
  if (!parts.length) return null;
  const safe = parts.map((part) => {
    const cleaned = part.replace(/[<>:"|?*\u0000-\u001f]/g, '_').replace(/[ .]+$/g, '');
    return cleaned || '_';
  });
  return safe;
}

function sourceKind(parts) {
  return parts.includes('node_modules') ? 'vendor' : 'application';
}

function sourceExtension(parts) {
  return path.extname(parts.at(-1) ?? '').toLowerCase();
}

async function auditLocalImports(applicationRoot) {
  const files = [];
  async function visit(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(entryPath);
      else if (/\.(?:ts|tsx|mjs|js)$/.test(entry.name)) files.push(entryPath);
    }
  }
  await visit(applicationRoot);
  const missing = [];
  const sourcePattern = /(?:import|export)\s+(?:[^'";]*?\s+from\s+)?['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\)/g;
  for (const file of files) {
    const text = await fs.readFile(file, 'utf8');
    for (const match of text.matchAll(sourcePattern)) {
      const specifier = match[1] ?? match[2];
      if (!specifier.startsWith('.') && !specifier.startsWith('@/')) continue;
      const base = specifier.startsWith('@/')
        ? path.join(applicationRoot, specifier.slice(2))
        : path.resolve(path.dirname(file), specifier);
      const candidates = [base, ...['.ts', '.tsx', '.mjs', '.js', '.json'].map((suffix) => `${base}${suffix}`), ...['index.ts', 'index.tsx', 'index.mjs', 'index.js', 'index.json'].map((name) => path.join(base, name))];
      let found = false;
      for (const candidate of candidates) {
        try { await fs.access(candidate); found = true; break; } catch { /* continue */ }
      }
      if (!found) missing.push({ file: path.relative(applicationRoot, file).replaceAll(path.sep, '/'), specifier });
    }
  }
  return { scannedFiles: files.length, missing };
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) fail(`unknown argument: ${token}`);
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) fail(`missing value for --${key}`);
    args[key] = value;
    index += 1;
  }
  return args;
}

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (error) {
    fail(`cannot parse source map ${file}: ${error.message}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.app) {
    console.error('Usage: node recover-sourcemaps.mjs --app ABSOLUTE_APP_PATH [--output ABSOLUTE_OUTPUT_PATH]');
    if (!args.app) process.exitCode = 2;
    return;
  }

  const appRoot = absolute(args.app, '--app');
  const outputRoot = absolute(args.output ?? path.join(recoveryRoot, 'recovered', 'sourcemaps'), '--output');
  if (!inside(recoveryRoot, outputRoot)) fail(`refusing to write outside recovery root: ${outputRoot}`);
  const appReal = await fs.realpath(appRoot).catch(() => fail(`app path does not exist: ${appRoot}`));
  const buildRoot = path.join(appReal, '.vite', 'build');
  const mapNames = (await fs.readdir(buildRoot, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.js.map'))
    .map((entry) => entry.name)
    .sort();
  if (!mapNames.length) fail(`no .js.map files found in ${buildRoot}`);

  await fs.mkdir(outputRoot, { recursive: true });
  const records = [];
  const collisions = [];
  const destinations = new Map();
  const mapSummaries = [];

  for (const mapName of mapNames) {
    const mapPath = path.join(buildRoot, mapName);
    const mapBytes = await fs.readFile(mapPath);
    const map = JSON.parse(mapBytes.toString('utf8'));
    const sources = Array.isArray(map.sources) ? map.sources : [];
    const contents = Array.isArray(map.sourcesContent) ? map.sourcesContent : [];
    const mapSummary = { map: mapName, mapSha256: sha256(mapBytes), totalSources: sources.length, embeddedSources: 0, missingContent: 0 };

    for (let index = 0; index < sources.length; index += 1) {
      const source = sources[index];
      const content = contents[index];
      const parts = normaliseForOutput(source);
      const hasContent = typeof content === 'string';
      if (!hasContent) mapSummary.missingContent += 1;
      else mapSummary.embeddedSources += 1;
      if (!parts || !hasContent) {
        records.push({ map: mapName, mapSha256: mapSummary.mapSha256, sourceIndex: index, source, status: parts ? 'missing-content' : 'invalid-source-path' });
        continue;
      }

      const kind = sourceKind(parts);
      const relative = path.join(kind, ...parts);
      const originalDestination = path.join(outputRoot, relative);
      if (!inside(outputRoot, originalDestination)) fail(`refusing unsafe recovered path: ${source}`);
      const contentHash = sha256(content);
      let destination = originalDestination;
      const prior = destinations.get(destination);
      if (prior && prior.contentHash !== contentHash) {
        const extension = path.extname(destination);
        destination = `${destination.slice(0, -extension.length)}__collision-${contentHash.slice(0, 12)}${extension}`;
        collisions.push({ requestedPath: path.relative(outputRoot, originalDestination), resolvedPath: path.relative(outputRoot, destination), previous: prior, current: { map: mapName, sourceIndex: index, source, contentHash } });
      }
      if (!destinations.has(destination)) {
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.writeFile(destination, content, 'utf8');
        destinations.set(destination, { map: mapName, sourceIndex: index, source, contentHash });
      }
      records.push({ map: mapName, mapSha256: mapSummary.mapSha256, sourceIndex: index, source, kind, status: prior && prior.contentHash !== contentHash ? 'collision-renamed' : 'recovered', output: path.relative(outputRoot, destination).replaceAll(path.sep, '/'), contentSha256: contentHash, bytes: Buffer.byteLength(content) });
    }
    mapSummaries.push(mapSummary);
  }

  const unique = new Map();
  for (const record of records) {
    if (record.status === 'recovered' || record.status === 'collision-renamed') unique.set(`${record.kind}:${record.source}`, record);
  }
  const application = [...unique.values()].filter((record) => record.kind === 'application');
  const vendor = [...unique.values()].filter((record) => record.kind === 'vendor');
  const appTs = application.filter((record) => ['.ts', '.tsx', '.mts', '.cts'].includes(sourceExtension(normaliseForOutput(record.source) ?? [])));
  const vendorTs = vendor.filter((record) => ['.ts', '.tsx', '.mts', '.cts'].includes(sourceExtension(normaliseForOutput(record.source) ?? [])));
  const localImportAudit = await auditLocalImports(path.join(outputRoot, 'application', 'src'));
  const report = {
    schema: 'tiro.source-recovery.v1',
    generatedAt: new Date().toISOString(),
    input: { appRoot: appReal, buildRoot, mapCount: mapNames.length },
    outputRoot,
    maps: mapSummaries,
    counts: { mapSources: records.length, uniqueRecoveredSources: unique.size, recoveredFiles: destinations.size, applicationSources: application.length, vendorSources: vendor.length, applicationTypeScriptSources: appTs.length, vendorTypeScriptSources: vendorTs.length, missingContent: records.filter((record) => record.status === 'missing-content').length, invalidSourcePaths: records.filter((record) => record.status === 'invalid-source-path').length, collisions: collisions.length },
    localImportAudit,
    collisions,
    records,
  };
  const evidenceDir = path.join(recoveryRoot, 'evidence');
  await fs.mkdir(evidenceDir, { recursive: true });
  await fs.writeFile(path.join(evidenceDir, 'source-recovery.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  const md = [
    '# Tiro source-map recovery', '',
    `Input: \`${appReal}\``, `Output: \`${outputRoot}\``, '',
    `Recovered ${destinations.size} files from ${mapNames.length} JavaScript source maps.`,
    `Application sources: ${application.length} (${appTs.length} TypeScript/TSX). Vendor sources: ${vendor.length} (${vendorTs.length} TypeScript/TSX).`,
    `Entries without embedded content: ${report.counts.missingContent}. Collisions renamed: ${collisions.length}.`, '',
    `Local import audit scanned ${localImportAudit.scannedFiles} recovered application files and found ${localImportAudit.missing.length} unresolved local or aliased imports.`,
    ...localImportAudit.missing.slice(0, 32).map(({ file, specifier }) => `- ${file} -> ${specifier}`), '',
    'Build planning: Electron main/preload TypeScript is substantially recoverable, but no renderer entry/UI source was embedded in the inspected maps. A main-only esbuild experiment is plausible after restoring package metadata, aliases, workspace packages, native modules, and the five unresolved imports; a full application rebuild is not established by these maps.', '',
    'The recovered files are embedded source-map content. Their presence does not prove that the original repository, build configuration, tests, generated assets, or dependency workspace were recovered.', '',
    'See `source-recovery.json` for per-map hashes, source indexes, provenance, output paths, content hashes, missing-content entries, and collision details.', '',
  ].join('\n');
  await fs.writeFile(path.join(evidenceDir, 'source-recovery.md'), `${md}\n`, 'utf8');
  console.log(JSON.stringify({ outputRoot, evidence: path.join(evidenceDir, 'source-recovery.json'), counts: report.counts }, null, 2));
}

main().catch((error) => {
  console.error(`source-map recovery failed: ${error.message}`);
  process.exitCode = 1;
});

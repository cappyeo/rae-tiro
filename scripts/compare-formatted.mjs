import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import prettier from 'prettier';
import { parsers } from 'prettier/plugins/babel';

const sha256 = (value) => createHash('sha256').update(value).digest('hex');

// Change only the order of flags on parser-identified regex literals. Literal
// patterns, strings, operators and every other byte remain unchanged.
export function canonicalRegexFlags(source) {
  const tree = parsers.babel.parse(source);
  const pending = [tree];
  const edits = [];
  while (pending.length) {
    const node = pending.pop();
    if (!node || typeof node !== 'object') continue;
    if (node.type === 'RegExpLiteral' && node.flags) {
      const flags = [...node.flags].sort().join('');
      if (flags !== node.flags) {
        const start = node.end - node.flags.length;
        if (source.slice(start, node.end) !== node.flags) throw new Error('Regex flag range mismatch.');
        edits.push({ start, end: node.end, flags });
      }
    }
    for (const [key, value] of Object.entries(node)) {
      if (['loc', 'extra', 'comments', 'tokens', 'leadingComments', 'trailingComments', 'innerComments'].includes(key)) continue;
      if (Array.isArray(value)) pending.push(...value);
      else if (value && typeof value === 'object') pending.push(value);
    }
  }
  let result = source;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    result = result.slice(0, edit.start) + edit.flags + result.slice(edit.end);
  }
  return result;
}

/**
 * Format raw shipped/editable source with the same pinned Prettier parser used
 * by format-recovered.mjs. This compares formatter output, not runtime behavior.
 */
export async function canonicalFormattedCode(source, loader) {
  const parser = loader === 'css' ? 'css' : 'babel';
  return prettier.format(source, { parser });
}

export async function compareFormattedFiles(originalPath, editablePath, loader) {
  const [originalSource, editableSource] = await Promise.all([
    readFile(originalPath, 'utf8'),
    readFile(editablePath, 'utf8'),
  ]);
  const [originalCanonical, editableCanonical] = await Promise.all([
    canonicalFormattedCode(originalSource, loader),
    canonicalFormattedCode(editableSource, loader),
  ]);
  const equal = originalCanonical === editableCanonical;
  return {
    equal,
    comparisonKind: equal ? 'pinned-formatter-output-equal' : 'different',
    original: sha256(originalCanonical),
    editable: sha256(editableCanonical),
    originalBytes: Buffer.byteLength(originalCanonical),
    editableBytes: Buffer.byteLength(editableCanonical),
  };
}

if (process.argv[1] && process.argv[1].endsWith('compare-formatted.mjs')) {
  const [originalPath, editablePath, loader = 'js'] = process.argv.slice(2);
  if (!originalPath || !editablePath) {
    throw new Error('Usage: node scripts/compare-formatted.mjs ORIGINAL EDITABLE [js|css]');
  }
  console.log(JSON.stringify(await compareFormattedFiles(originalPath, editablePath, loader), null, 2));
}

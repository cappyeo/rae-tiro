# Renderer fingerprint mismatch investigation

## Result

The two failing files are formatting-only for the JavaScript bundle and whitespace-only for the CSS bundle in the tested comparison. The checker currently asks for byte equality after esbuild normalization; that is stricter than a finite semantic consistency gate for these editable copies.

## JavaScript evidence

Inputs:

- Preserved: `preserved/app/.vite/renderer/main_window/assets/index-CXautzcB.js`, raw size 5,785,358 bytes, SHA-256 `455BD6EF381652704CEBCD65C58C460DEB63AE784F4925AB974333284AA166C2`.
- Editable: `src/compiled/.vite/renderer/main_window/assets/index-CXautzcB.js`, raw size 9,812,141 bytes, SHA-256 `7F634147892D803B3CF642A2E62BE55EA42CA73D133D2BD6C9CF3AC7591BE272`.
- Both normalize with esbuild `0.25.12` and the checker options (`loader: js`, `minify: true`, `legalComments: none`, `charset: utf8`, `target: esnext`) to exactly 5,692,167 bytes.
- The first normalized difference is at offset 2,622,834: preserved has regex flags `/.../ig`; editable has `/.../gi`. These flag orders are equivalent because JavaScript regex flags are order-insensitive. A bounded lexical canonicalization that sorts only regex flags makes the complete normalized outputs byte-identical: 5,692,167 bytes on both sides, identical canonical output.

This is consistent with Prettier reformatting the editable copy. No function body, literal, module bootstrap, or API string changed in the normalized JavaScript equivalence check; the mismatch is the order emitted for regex flags.

## CSS evidence

Inputs:

- Preserved: `preserved/app/.vite/renderer/main_window/assets/index-DEPkF0IT.css`, raw size 306,253 bytes, SHA-256 `E7DFDF2ABDD47FCA6EFF8B5EECB9714ED331B6F8AFE90C3532A35B537C71AA7E`.
- Editable: `src/compiled/.vite/renderer/main_window/assets/index-DEPkF0IT.css`, raw size 365,022 bytes, SHA-256 `31727C9A85A6260D381E20B8796BABCEF5E3D0EA354AB74A37E401EAFE85A649`.
- Esbuild normalization produces 306,133 bytes from preserved and 307,618 bytes from editable. The first difference is at normalized offset 55,699: preserved emits `(-webkit-hyphens:none)` and editable emits `(-webkit-hyphens: none)`; the same pattern occurs for custom-property values and CSS shorthand operators.
- A second representative difference is `grid-row:span 2/span 2` versus `grid-row:span 2 / span 2`. CSS grammar permits the optional whitespace around `/`; the declaration's token sequence and value are unchanged.

The CSS mismatch therefore comes from the formatter retaining/inserting legal whitespace that esbuild does not canonicalize identically when fed already formatted CSS. Because whitespace can matter in some CSS values, this is evidence of formatting divergence rather than a proof of complete CSS semantic identity. The appropriate gate should compare parsed CSS rules/declarations or perform a CSS-aware token comparison, not raw output hashes.

## Runtime corroboration

The existing offline smoke probes independently passed for both preserved and rebuilt renderer assets (`evidence/smoke-preserved.json` and `evidence/smoke-source2.json`). Both produced the same login text, root child count 2, Electron bridge object, version `4.9.14`, 50 bridge members, supported recording status and no render errors. Network was blocked in both probes, so this confirms startup/login rendering only and does not prove authenticated or audio behavior.

## Gate recommendation

Keep exact normalized hashes for the 11 files that match. For these two renderer assets, replace the false-negative condition with two finite checks: JavaScript esbuild output after regex-flag canonicalization; CSS parser/token equivalence over selectors, at-rules, declarations and values, retaining meaningful whitespace inside values. Report the files as `format-equivalent` rather than `byte-equal`, and keep runtime smoke as a separate acceptance gate. Do not claim source recovery or full runtime equivalence from either check.

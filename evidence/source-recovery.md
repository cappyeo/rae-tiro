# Tiro source-map recovery

Input: `C:\Users\jeong\Documents\Codex\2026-10-16\c-users-jeong-downloads-tiro-4\outputs\tiro-recovered\preserved\app`
Output: `C:\Users\jeong\Documents\Codex\2026-10-16\c-users-jeong-downloads-tiro-4\outputs\tiro-recovered\recovered\sourcemaps`

Recovered 623 files from 7 JavaScript source maps.
Application sources: 63 (62 TypeScript/TSX). Vendor sources: 560 (0 TypeScript/TSX).
Entries without embedded content: 0. Collisions renamed: 0.

Local import audit scanned 62 recovered application files and found 5 unresolved local or aliased imports.
- main/preload.ts -> @/renderer/entities/mainLog
- main/preload.ts -> @/renderer/entities/nativeAudioDiagnostics
- main/preload.ts -> @/renderer/entities/updateTelemetry
- main/preload.ts -> ../../package.json
- main/utils/nativeAudioDiagnostics.ts -> @/renderer/entities/nativeAudioDiagnostics

Build planning: Electron main/preload TypeScript is substantially recoverable, but no renderer entry/UI source was embedded in the inspected maps. A main-only esbuild experiment is plausible after restoring package metadata, aliases, workspace packages, native modules, and the five unresolved imports; a full application rebuild is not established by these maps.

The recovered files are embedded source-map content. Their presence does not prove that the original repository, build configuration, tests, generated assets, or dependency workspace were recovered.

See `source-recovery.json` for per-map hashes, source indexes, provenance, output paths, content hashes, missing-content entries, and collision details.


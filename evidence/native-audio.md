# Native audio helper audit

This is a read-only audit. The helper was not started, so no microphone or system-audio device was opened.

## Artifact identity

- Path: `preserved/external/win/tiro-audio-capture.exe`
- Size: 909,056 bytes
- SHA-256: `eb036f32dacc118baade22afad8ec2d78f6d5b6546db45a31a1326dcd75e148b`
- Windows Authenticode: signature status `Valid`.
- Static strings identify a Rust binary, `tiro_audio_capture.pdb`, CPAL 0.15.3, WASAPI, and source paths under `crates/tiro-audio-capture/src/`.
- Static strings also expose the rustc path containing commit `8bab26f4f68e0e26f0bb7960be334d5b520ea452`. This is compiler/build metadata, not recovered Rust source. The associated REA Rust inspection recorded no `.dep-v0` cargo-auditable dependency section.

## Process contract observed in recovered TypeScript

`AudioCaptureProcess.ts` spawns the Windows helper with:

```text
tiro-audio-capture.exe --sample-rate <number> --noise-gate-db <number>
```

The default values in the recovered manager are `16000` Hz and `-50` dB. stdin receives one newline-delimited UTF-8 JSON command per line:

```json
{"cmd":"start","sources":["mic","system"],"mic_device":"optional-id","diagnostic_attempt_id":123}
{"cmd":"stop"}
{"cmd":"pause"}
{"cmd":"set_gain","source":"mic","gain":1}
{"cmd":"ping"}
{"cmd":"shutdown"}
```

`sources` may contain `mic` and/or `system`; `mic_device` and `diagnostic_attempt_id` are optional. The recovered TypeScript does not establish the native range validation for gain or the accepted device-id format.

stdout is a binary stream with repeated little-endian frames:

```text
byte 0       tag
bytes 1..4   uint32 LE payload length
bytes 5..    payload
```

Known tags from the recovered parser:

| Tag | Payload | Consumer meaning |
| --- | --- | --- |
| `0x01` | Int16 PCM bytes | 16 kHz processed stream for STT/STOMP |
| `0x02` | UTF-8 JSON | Control/event record |
| `0x03` | Int16 PCM bytes | 48 kHz raw stream for offline WAV recording |

The parser accepts fragmented/chunked stdout and processes multiple frames. Unknown tags are logged and discarded. The TypeScript source does not establish channel count or byte order beyond the Int16 PCM comments and downstream mono WAV assumptions; downstream code treats the audio as mono.

JSON event records observed in the type union are:

```json
{"event":"started","timestamp":0,"sources":["mic"]}
{"event":"stopped","timestamp":0}
{"event":"paused"}
{"event":"level","rms":0,"peak":0,"mixed_linear_rms":0,"mixed_linear_peak":0,"mic_linear_rms":0,"mic_linear_peak":0,"system_linear_rms":0,"system_linear_peak":0,"mic_input_fill_ratio":0,"system_input_fill_ratio":0}
{"event":"error","code":"...","message":"...","fatal":false}
{"event":"pong"}
{"event":"device_lost","source":"mic"}
{"event":"permission_required","source":"mic"}
```

The manager maps events to lifecycle states, performs a 5-second ping heartbeat with a 10-second timeout, retries crashes up to three times, and restarts after device loss. These are host-side behaviors, not proof that the helper itself implements the same recovery policy.

## Native implementation clues and gaps

Static strings identify the likely Rust modules `main.rs`, `mixer.rs`, `processor.rs`, and `capture/system_win.rs`, plus CPAL/WASAPI calls for microphone and loopback capture. They also expose native error families such as `DEVICE_NOT_FOUND`, `DEVICE_LOST`, `PERMISSION_DENIED`, `STREAM_ERROR`, `INVALID_COMMAND`, and `INTERNAL_ERROR`.

No Rust source tree, Cargo manifest, PDB file, dependency lockfile, or native test vectors was present beside the helper. Embedded strings are useful reconstruction clues but do not recover function bodies, exact mixer/resampler/AGC/noise-gate algorithms, device enumeration rules, or failure timing. A faithful native replacement therefore requires a focused native PE decompilation pass plus behavior probes with an explicitly approved audio test setup; the helper itself must remain unopened for this audit.

## Reconstruction assessment

The protocol boundary is sufficiently specified to write a non-capturing protocol fixture and to compile the recovered TypeScript against a replacement helper interface. It is insufficient to claim audio equivalence. The highest-risk gaps are native source processing, channel/sample framing details, exact `level` cadence, device selection, WASAPI loopback behavior, and native error-to-event mapping. Preserve the original PE as the reference artifact and label any replacement as a clean-room implementation guided by this observed contract.

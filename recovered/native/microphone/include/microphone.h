#pragma once
#include <string>
#include <vector>

namespace microphone {
// Returns true when the default input device (microphone) is in use.
// Supported on macOS (CoreAudio) and Windows (WASAPI).
// On other platforms, this function returns false.
bool is_in_use();

// Marks that Tiro has started using the microphone.
// This should be called when Tiro begins audio capture.
void start_tiro_session();

// Marks that Tiro has stopped using the microphone.
// This should be called when Tiro ends audio capture.
void stop_tiro_session();

// Returns true when an application OTHER THAN Tiro is using the microphone.
// This function automatically excludes Tiro's own microphone usage.
// Supported on macOS (CoreAudio) and Windows (WASAPI).
// On other platforms, this function returns false.
bool is_other_app_using_mic();

// A single process currently using the microphone for INPUT.
struct MicInputProcess {
  int pid;                // OS process id; -1 if unknown
  std::string identifier; // win: executable basename, lowercased (e.g. "zoom.exe")
                          // mac: bundle id (e.g. "us.zoom.xos"); may be empty
  std::string executable; // win: full executable path; mac: empty
};

// Returns every process currently using the microphone for input. The caller is
// responsible for excluding Tiro's own processes (by pid/identifier) and for
// mapping identifiers to known call apps — this layer is a pure sensor.
//
// - Windows: active WASAPI capture sessions (process id + image name).
// - macOS 14.4+: CoreAudio process objects with input running.
// - macOS < 14.4 and other platforms: empty (feature stays dormant — the
//   per-process input API does not exist there).
std::vector<MicInputProcess> get_mic_input_processes();
} // namespace microphone

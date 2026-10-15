#include "../include/microphone.h"
#include <cctype>
#include <string>
#include <vector>
#if defined(__APPLE__)
#include <CoreAudio/CoreAudio.h>
#include <CoreFoundation/CoreFoundation.h>
#include <unistd.h>
#elif defined(_WIN32)
#include <windows.h>
#include <mmdeviceapi.h>
#include <audioclient.h>
#include <audiopolicy.h>
#include <comdef.h>
#include <wrl/client.h>

using namespace Microsoft::WRL;
#endif

namespace microphone {

// Track Tiro's own microphone session
static bool tiro_session_active = false;

#if defined(__APPLE__)
static AudioDeviceID tiro_device_id = kAudioObjectUnknown;
#elif defined(_WIN32)
static DWORD tiro_process_id = 0;
#endif

bool is_in_use() {
#if defined(__APPLE__)
  // Get default input device
  AudioDeviceID defaultInputDevice = kAudioObjectUnknown;
  AudioObjectPropertyAddress defaultInputAddress = {
      kAudioHardwarePropertyDefaultInputDevice, kAudioObjectPropertyScopeGlobal,
      kAudioObjectPropertyElementMain};
  UInt32 dataSize = sizeof(defaultInputDevice);
  OSStatus status =
      AudioObjectGetPropertyData(kAudioObjectSystemObject, &defaultInputAddress,
                                 0, nullptr, &dataSize, &defaultInputDevice);
  if (status != noErr || defaultInputDevice == kAudioObjectUnknown) {
    return false;
  }

  // Check whether the device is running (indicates IO in progress)
  // kAudioDevicePropertyDeviceIsRunningSomewhere is true if the device is
  // running in any process
  UInt32 isRunning = 0;
  dataSize = sizeof(isRunning);
  AudioObjectPropertyAddress runningAddr = {
      kAudioDevicePropertyDeviceIsRunningSomewhere,
      kAudioObjectPropertyScopeGlobal, kAudioObjectPropertyElementMain};

  status = AudioObjectGetPropertyData(defaultInputDevice, &runningAddr, 0,
                                      nullptr, &dataSize, &isRunning);
  if (status != noErr) {
    return false;
  }

  return isRunning != 0;
#elif defined(_WIN32)
  // Windows: WASAPI (Windows Audio Session API) 사용
  HRESULT hr = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
  bool needsUninit = SUCCEEDED(hr);

  // 이미 초기화된 스레드에서 호출될 수 있음 (RPC_E_CHANGED_MODE)
  if (FAILED(hr) && hr != RPC_E_CHANGED_MODE) {
    return false;
  }

  bool inUse = false;

  do {
    // ComPtr는 반드시 CoUninitialize() "이전"에 해제되어야 한다. 함수 스코프에
    // 두면 소멸자(Release)가 COM 해제 이후 실행되어 UB — plain-node에서 SIGSEGV.
    // (Electron에서는 Chromium이 COM을 선점 초기화해 RPC_E_CHANGED_MODE →
    // needsUninit=false 경로라 가려져 있었을 뿐.) do 블록 스코프에 두어
    // COM이 살아있는 동안 해제되게 한다.
    ComPtr<IMMDeviceEnumerator> deviceEnumerator;
    ComPtr<IMMDevice> device;
    ComPtr<IAudioSessionManager2> sessionManager;
    ComPtr<IAudioSessionEnumerator> sessionEnum;

    // 1. Device Enumerator 생성
    hr = CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr,
                          CLSCTX_ALL, __uuidof(IMMDeviceEnumerator),
                          (void**)&deviceEnumerator);
    if (FAILED(hr)) break;

    // 2. 기본 입력 디바이스 가져오기 (마이크)
    hr = deviceEnumerator->GetDefaultAudioEndpoint(eCapture, eConsole, &device);
    if (FAILED(hr)) break;

    // 3. Session Manager 가져오기
    hr = device->Activate(__uuidof(IAudioSessionManager2), CLSCTX_ALL,
                          nullptr, (void**)&sessionManager);
    if (FAILED(hr)) break;

    // 4. Session Enumerator 가져오기
    hr = sessionManager->GetSessionEnumerator(&sessionEnum);
    if (FAILED(hr)) break;

    // 5. 활성 세션 확인
    int sessionCount = 0;
    hr = sessionEnum->GetCount(&sessionCount);
    if (FAILED(hr)) break;

    for (int i = 0; i < sessionCount; i++) {
      ComPtr<IAudioSessionControl> sessionControl;
      ComPtr<IAudioSessionControl2> sessionControl2;

      hr = sessionEnum->GetSession(i, &sessionControl);
      if (FAILED(hr)) continue;

      hr = sessionControl.As(&sessionControl2);
      if (FAILED(hr)) continue;

      // 세션 상태 확인
      AudioSessionState state;
      hr = sessionControl2->GetState(&state);
      if (SUCCEEDED(hr) && state == AudioSessionStateActive) {
        inUse = true;
        break;
      }
    }
  } while (false);

  // COM 정리
  if (needsUninit) {
    CoUninitialize();
  }

  return inUse;
#else
  return false;
#endif
}

void start_tiro_session() {
  tiro_session_active = true;

#if defined(__APPLE__)
  // macOS: Store the current default input device ID
  AudioObjectPropertyAddress defaultInputAddress = {
      kAudioHardwarePropertyDefaultInputDevice, kAudioObjectPropertyScopeGlobal,
      kAudioObjectPropertyElementMain};
  UInt32 dataSize = sizeof(tiro_device_id);
  OSStatus status =
      AudioObjectGetPropertyData(kAudioObjectSystemObject, &defaultInputAddress,
                                 0, nullptr, &dataSize, &tiro_device_id);
  if (status != noErr) {
    tiro_device_id = kAudioObjectUnknown;
  }
#elif defined(_WIN32)
  // Windows: Store the current process ID
  tiro_process_id = GetCurrentProcessId();
#endif
}

void stop_tiro_session() {
  tiro_session_active = false;

#if defined(__APPLE__)
  tiro_device_id = kAudioObjectUnknown;
#elif defined(_WIN32)
  tiro_process_id = 0;
#endif
}

bool is_other_app_using_mic() {
  // If Tiro's session is active, always return false
  // (we don't want to notify when Tiro itself is using the mic)
  if (tiro_session_active) {
    return false;
  }

  // Otherwise, check if any app is using the microphone
  return is_in_use();
}

std::vector<MicInputProcess> get_mic_input_processes() {
  std::vector<MicInputProcess> result;

#if defined(__APPLE__)
  // Per-process input attribution needs the CoreAudio process-object API
  // (macOS 14.4+). On older systems / SDKs we return empty — the meeting-end
  // feature stays dormant rather than guessing from device-level state.
#if defined(__MAC_OS_X_VERSION_MAX_ALLOWED) &&                                 \
    __MAC_OS_X_VERSION_MAX_ALLOWED >= 140400
  if (__builtin_available(macOS 14.4, *)) {
    AudioObjectPropertyAddress listAddr = {
        kAudioHardwarePropertyProcessObjectList, kAudioObjectPropertyScopeGlobal,
        kAudioObjectPropertyElementMain};

    UInt32 dataSize = 0;
    OSStatus status = AudioObjectGetPropertyDataSize(
        kAudioObjectSystemObject, &listAddr, 0, nullptr, &dataSize);
    if (status != noErr || dataSize == 0) {
      return result;
    }

    std::vector<AudioObjectID> processes(dataSize / sizeof(AudioObjectID));
    status = AudioObjectGetPropertyData(kAudioObjectSystemObject, &listAddr, 0,
                                        nullptr, &dataSize, processes.data());
    if (status != noErr) {
      return result;
    }

    for (AudioObjectID proc : processes) {
      // Only processes actively running the input (the mic).
      AudioObjectPropertyAddress runAddr = {
          kAudioProcessPropertyIsRunningInput, kAudioObjectPropertyScopeGlobal,
          kAudioObjectPropertyElementMain};
      UInt32 running = 0;
      UInt32 runSize = sizeof(running);
      if (AudioObjectGetPropertyData(proc, &runAddr, 0, nullptr, &runSize,
                                     &running) != noErr ||
          running == 0) {
        continue;
      }

      MicInputProcess entry;
      entry.pid = -1;

      pid_t pid = -1;
      UInt32 pidSize = sizeof(pid);
      AudioObjectPropertyAddress pidAddr = {kAudioProcessPropertyPID,
                                            kAudioObjectPropertyScopeGlobal,
                                            kAudioObjectPropertyElementMain};
      if (AudioObjectGetPropertyData(proc, &pidAddr, 0, nullptr, &pidSize,
                                     &pid) == noErr) {
        entry.pid = static_cast<int>(pid);
      }

      // Bundle id — may be empty for non-bundled executables (e.g. helpers).
      CFStringRef bundleId = nullptr;
      UInt32 bidSize = sizeof(bundleId);
      AudioObjectPropertyAddress bidAddr = {kAudioProcessPropertyBundleID,
                                            kAudioObjectPropertyScopeGlobal,
                                            kAudioObjectPropertyElementMain};
      if (AudioObjectGetPropertyData(proc, &bidAddr, 0, nullptr, &bidSize,
                                     &bundleId) == noErr &&
          bundleId != nullptr) {
        char buffer[512];
        if (CFStringGetCString(bundleId, buffer, sizeof(buffer),
                               kCFStringEncodingUTF8)) {
          entry.identifier = buffer;
        }
        CFRelease(bundleId);
      }

      result.push_back(entry);
    }
  }
#endif // __MAC_OS_X_VERSION_MAX_ALLOWED >= 140400

#elif defined(_WIN32)
  HRESULT hr = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
  bool needsUninit = SUCCEEDED(hr);
  if (FAILED(hr) && hr != RPC_E_CHANGED_MODE) {
    return result;
  }

  do {
    // ComPtrs MUST release before CoUninitialize() below — at function scope
    // their destructors (Release) would run AFTER COM teardown, which is UB
    // (SIGSEGV in plain node; masked in Electron only because Chromium
    // pre-initializes COM → RPC_E_CHANGED_MODE → needsUninit=false). Keeping
    // them inside the do-block scopes their release while COM is alive.
    ComPtr<IMMDeviceEnumerator> deviceEnumerator;
    ComPtr<IMMDevice> device;
    ComPtr<IAudioSessionManager2> sessionManager;
    ComPtr<IAudioSessionEnumerator> sessionEnum;

    hr = CoCreateInstance(__uuidof(MMDeviceEnumerator), nullptr, CLSCTX_ALL,
                          __uuidof(IMMDeviceEnumerator),
                          (void **)&deviceEnumerator);
    if (FAILED(hr)) break;
    hr = deviceEnumerator->GetDefaultAudioEndpoint(eCapture, eConsole, &device);
    if (FAILED(hr)) break;
    hr = device->Activate(__uuidof(IAudioSessionManager2), CLSCTX_ALL, nullptr,
                          (void **)&sessionManager);
    if (FAILED(hr)) break;
    hr = sessionManager->GetSessionEnumerator(&sessionEnum);
    if (FAILED(hr)) break;

    int sessionCount = 0;
    hr = sessionEnum->GetCount(&sessionCount);
    if (FAILED(hr)) break;

    for (int i = 0; i < sessionCount; i++) {
      ComPtr<IAudioSessionControl> sessionControl;
      ComPtr<IAudioSessionControl2> sessionControl2;
      if (FAILED(sessionEnum->GetSession(i, &sessionControl))) continue;
      if (FAILED(sessionControl.As(&sessionControl2))) continue;

      AudioSessionState state;
      if (FAILED(sessionControl2->GetState(&state)) ||
          state != AudioSessionStateActive) {
        continue;
      }

      DWORD pid = 0;
      if (FAILED(sessionControl2->GetProcessId(&pid)) || pid == 0) {
        continue; // pid 0 = system/shared session
      }

      MicInputProcess entry;
      entry.pid = static_cast<int>(pid);

      // Resolve the image name. A capturing process can exit between
      // GetProcessId and OpenProcess (the PID may even be recycled onto an
      // unrelated process), and protected processes can't be opened at all. In
      // every one of those cases we SKIP the session rather than emit an
      // ambiguous pid-only entry — so identifier and executable are always
      // populated together, a recycled PID can't leave a half-filled entry,
      // and the caller never sees pid>0 with an empty name. identifier stays
      // advisory (see index.d.ts), since it is resolved from the live OS here.
      HANDLE hProc = OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, FALSE, pid);
      if (hProc == nullptr) {
        continue;
      }

      wchar_t path[MAX_PATH];
      DWORD pathSize = MAX_PATH;
      bool resolved = false;
      if (QueryFullProcessImageNameW(hProc, 0, path, &pathSize)) {
        int needed = WideCharToMultiByte(CP_UTF8, 0, path, -1, nullptr, 0,
                                         nullptr, nullptr);
        if (needed > 0) {
          // `needed` counts the trailing NUL (input length is -1). Size the
          // string to `needed` so WideCharToMultiByte writes only into data
          // positions, then drop the NUL from the logical length. This avoids
          // writing into std::string's own terminator slot.
          std::string full(static_cast<size_t>(needed), '\0');
          WideCharToMultiByte(CP_UTF8, 0, path, -1, &full[0], needed, nullptr,
                              nullptr);
          full.resize(static_cast<size_t>(needed - 1));
          entry.executable = full;
          size_t slash = full.find_last_of("\\/");
          std::string base =
              (slash == std::string::npos) ? full : full.substr(slash + 1);
          for (char &c : base) {
            c = static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
          }
          entry.identifier = base;
          resolved = true;
        }
      }
      CloseHandle(hProc);

      if (!resolved) {
        continue;
      }

      result.push_back(entry);
    }
  } while (false);

  if (needsUninit) {
    CoUninitialize();
  }
#endif

  return result;
}
} // namespace microphone

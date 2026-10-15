#include "../include/microphone.h"
#include <napi.h>
#include <string>

Napi::Value IsMicInUse(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  bool result = microphone::is_in_use();
  return Napi::Boolean::New(env, result);
}

void StartTiroSession(const Napi::CallbackInfo &info) {
  microphone::start_tiro_session();
}

void StopTiroSession(const Napi::CallbackInfo &info) {
  microphone::stop_tiro_session();
}

Napi::Value IsOtherAppUsingMic(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  bool result = microphone::is_other_app_using_mic();
  return Napi::Boolean::New(env, result);
}

Napi::Value GetMicInputProcesses(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  std::vector<microphone::MicInputProcess> processes =
      microphone::get_mic_input_processes();

  Napi::Array result = Napi::Array::New(env, processes.size());
  for (size_t i = 0; i < processes.size(); i++) {
    Napi::Object entry = Napi::Object::New(env);
    entry.Set("pid", Napi::Number::New(env, processes[i].pid));
    entry.Set("identifier", Napi::String::New(env, processes[i].identifier));
    entry.Set("executable", Napi::String::New(env, processes[i].executable));
    result.Set(i, entry);
  }
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("isMicInUse", Napi::Function::New(env, IsMicInUse));
  exports.Set("startTiroSession", Napi::Function::New(env, StartTiroSession));
  exports.Set("stopTiroSession", Napi::Function::New(env, StopTiroSession));
  exports.Set("isOtherAppUsingMic", Napi::Function::New(env, IsOtherAppUsingMic));
  exports.Set("getMicInputProcesses",
              Napi::Function::New(env, GetMicInputProcesses));
  return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
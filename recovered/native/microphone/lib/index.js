// eslint-disable-next-line @typescript-eslint/no-require-imports
const bindings = require("bindings");
const native = bindings("microphone");

function isMicInUse() {
  return native.isMicInUse();
}

function startTiroSession() {
  return native.startTiroSession();
}

function stopTiroSession() {
  return native.stopTiroSession();
}

function isOtherAppUsingMic() {
  return native.isOtherAppUsingMic();
}

function getMicInputProcesses() {
  return native.getMicInputProcesses();
}

module.exports = {
  isMicInUse,
  startTiroSession,
  stopTiroSession,
  isOtherAppUsingMic,
  getMicInputProcesses,
};

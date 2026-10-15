"use strict";
try {
  let e =
      typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof globalThis < "u"
            ? globalThis
            : typeof self < "u"
              ? self
              : {},
    d = new e.Error().stack;
  d &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[d] = "e283d95f-1683-4fb9-b9bc-dd6920a63111"),
    (e._sentryDebugIdIdentifier =
      "sentry-dbid-e283d95f-1683-4fb9-b9bc-dd6920a63111"));
} catch {}
const n = require("electron");
{
  let e =
    typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof globalThis < "u"
          ? globalThis
          : typeof self < "u"
            ? self
            : {};
  e.SENTRY_RELEASE = { id: "b0e582b6b191bb327293ebbcbbdf60646085db2b" };
}
n.contextBridge.exposeInMainWorld("overlay", {
  click: () => n.ipcRenderer.invoke("overlay:clicked"),
  onAudioLevel: (e) => {
    n.ipcRenderer.on("overlay:audio-level", (d, o) => e(o));
  },
});
//# sourceMappingURL=overlayPreload.js.map

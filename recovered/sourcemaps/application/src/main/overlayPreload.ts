// Preload for the recording overlay window (createOverlayWindow).

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('overlay', {
  click: () => ipcRenderer.invoke('overlay:clicked'),
  onAudioLevel: (callback: (level: number) => void) => {
    ipcRenderer.on('overlay:audio-level', (_event, level: number) =>
      callback(level),
    );
  },
});

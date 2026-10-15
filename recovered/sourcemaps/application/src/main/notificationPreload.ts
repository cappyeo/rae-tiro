// Preload for the calendar/mic notification window (createNotificationWindow).
// The window renders data: HTML that can carry calendar text, so it gets these
// calls and nothing else.

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('notification', {
  setIgnoreMouse: (ignore: boolean) =>
    ipcRenderer.send('notification:set-ignore-mouse', ignore),
  runAction: (locales?: { transcribeLocale: string; summaryLocale: string }) =>
    ipcRenderer.invoke('notification:action-clicked', locales),
});

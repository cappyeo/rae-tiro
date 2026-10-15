// Recovery-only launcher. The preserved application is never changed here.
const { app, BrowserWindow, session, shell, autoUpdater } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const value = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const smoke = args.includes('--smoke');
const online = args.includes('--online') && !smoke;
const label = value('--label', 'recovered');
if (!/^[a-z0-9-]+$/.test(label ?? '')) throw new Error('Invalid label.');
const appDir = path.resolve(root, value('--app', 'dist/source-app'));
const relativeApp = path.relative(root, appDir);
if (!relativeApp || relativeApp.startsWith('..') || path.isAbsolute(relativeApp)) throw new Error('App must be a child of this recovery project.');
const profile = path.join(root, '.recovery-profiles', smoke ? `smoke-${label}` : 'development');
const reportPath = path.join(root, 'evidence', `smoke-${label}.json`);
const report = {
  label, app: relativeApp.replaceAll('\\', '/'), timestamp: new Date().toISOString(),
  mode: 'recovery-launcher', network: online ? 'online' : 'blocked',
  originalProfileUsed: false, protocolRegistrationDisabled: true, autoUpdateDisabled: true,
  errors: [], blockedNetwork: [], passed: false,
};
for (const name of ['userData', 'sessionData', 'logs', 'documents', 'downloads', 'temp']) {
  const dir = path.join(profile, name);
  fs.mkdirSync(dir, { recursive: true });
  app.setPath(name, dir);
}
app.setName('Tiro Recovery');
app.setAppPath(appDir);
const appManifest = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'));
app.getVersion = () => appManifest.version;
process.resourcesPath = path.join(root, 'preserved');
process.env.NODE_ENV = 'test';
delete process.env.TIRO_DESKTOP_AI;
// Keep development runs from replacing the installed app's URL associations or updater.
app.setAsDefaultProtocolClient = () => false;
app.removeAsDefaultProtocolClient = () => false;
app.setLoginItemSettings = () => {};
autoUpdater.setFeedURL = () => {};
autoUpdater.checkForUpdates = () => {};
autoUpdater.quitAndInstall = () => {};
const recordBlocked = url => {
  const safe = String(url).split('?')[0].split('#')[0];
  if (!report.blockedNetwork.includes(safe) && report.blockedNetwork.length < 80) report.blockedNetwork.push(safe);
};
if (!online) {
  app.commandLine.appendSwitch('host-resolver-rules', 'MAP * ~NOTFOUND, EXCLUDE localhost');
  app.commandLine.appendSwitch('proxy-server', 'http://127.0.0.1:9');
  app.commandLine.appendSwitch('disable-background-networking');
  shell.openExternal = async url => { recordBlocked(url); throw new Error('External navigation is disabled in recovery offline mode.'); };
  globalThis.fetch = async input => { recordBlocked(input?.url ?? input); throw new Error('Network is disabled in recovery offline mode.'); };
  const originalConnect = net.Socket.prototype.connect;
  net.Socket.prototype.connect = function (...connectArgs) {
    const normalized = connectArgs[0];
    const option = Array.isArray(normalized) ? normalized[0] : normalized;
    // Named pipes do not transmit Internet traffic; TCP is denied, including bundled HTTP/WS libraries.
    const pipe = typeof option === 'object' && typeof option.path === 'string';
    if (pipe) return originalConnect.apply(this, connectArgs);
    recordBlocked('node-tcp-blocked');
    queueMicrotask(() => this.destroy(Object.assign(new Error('Network is disabled in recovery offline mode.'), { code: 'ENETUNREACH' })));
    return this;
  };
  const protectSession = ses => {
    const original = ses.webRequest.onBeforeRequest.bind(ses.webRequest);
    let consumer = null;
    let patterns = [];
    const match = url => patterns.some(pattern => pattern === '<all_urls>' || new RegExp('^' + pattern.split('*').map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$').test(url));
    const install = () => original({ urls: ['<all_urls>'] }, (details, callback) => {
      if (/^(?:https?|wss?|ftp):/i.test(details.url)) {
        recordBlocked(details.url);
        callback({ cancel: true });
      } else if (consumer && match(details.url)) consumer(details, callback);
      else callback({});
    });
    ses.webRequest.onBeforeRequest = (filter, listener) => {
      consumer = typeof filter === 'function' ? filter : listener;
      patterns = filter?.urls ?? ['<all_urls>'];
      install();
    };
    install();
    ses.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
    ses.setPermissionCheckHandler(() => false);
  };
  app.on('session-created', protectSession);
}
let finished = false;
const finish = (passed, reason) => {
  if (!smoke || finished) return;
  finished = true;
  report.passed = passed;
  if (reason) report.errors.push(reason);
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
  app.exit(passed ? 0 : 1);
};
process.on('uncaughtException', error => {
  report.errors.push(`main: ${error.message}`);
  if (smoke) finish(false); else console.error(error);
});
process.on('unhandledRejection', error => {
  if (report.errors.length < 30) report.errors.push(`promise: ${error?.message ?? error}`);
});
if (smoke) {
  app.commandLine.appendSwitch('remote-debugging-address', '127.0.0.1');
  const cdpPort = value('--cdp-port', null);
  if (cdpPort) app.commandLine.appendSwitch('remote-debugging-port', cdpPort);
  setTimeout(() => finish(false, 'No usable renderer within 40 seconds.'), 40_000);
  app.on('browser-window-created', (_event, window) => {
    // Capture the real renderer without opening a foreground test window.
    window.show = () => {};
    window.webContents.on('preload-error', (_event, _file, error) => report.errors.push(`preload: ${error.message}`));
    window.webContents.on('render-process-gone', (_event, detail) => finish(false, `Renderer exited: ${detail.reason}`));
    window.webContents.on('did-fail-load', (_event, code, description, url, mainFrame) => {
      if (mainFrame && code !== -3) report.errors.push(`load: ${code} ${description} ${url}`);
    });
    window.webContents.on('console-message', (_event, ...details) => {
      const data = typeof details[0] === 'object' ? details[0] : { level: details[0], message: details[1] };
      if ((data.level === 3 || data.level === 'error') && report.errors.length < 30) report.errors.push(`console: ${String(data.message).slice(0, 400)}`);
    });
    window.webContents.on('did-finish-load', () => {
      if (!window.webContents.getURL().startsWith('file:')) return;
      setTimeout(async () => {
        if (finished || window.isDestroyed()) return;
        try {
          report.renderer = await window.webContents.executeJavaScript(`(async () => ({
            url: location.href, title: document.title,
            text: document.body.innerText.slice(0, 5000), rootChildren: document.getElementById('root')?.childElementCount ?? 0,
            electronBridge: typeof window.electron, version: window.electron?.app?.version,
            bridgeMembers: Object.keys(window.electron ?? {}).sort(),
            imageFailures: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')),
            readOnlyIpc: { isMaximized: await window.electron?.windows?.isMaximized(), zoom: await window.electron?.zoom?.getLevel(), recordingSupport: await window.electron?.recordingSupport?.get() }
          }))()`);
          const image = await window.webContents.capturePage();
          fs.writeFileSync(path.join(root, 'evidence', `smoke-${label}.png`), image.toPNG());
          report.screenshot = `evidence/smoke-${label}.png`;
          // Offline service errors remain in the report; renderer mount and IPC are the startup gates.
          const mounted = report.renderer.rootChildren > 0 && report.renderer.text.trim().length > 20;
          const bridge = report.renderer.version === '4.9.14' && report.renderer.electronBridge === 'object';
          const fatal = report.errors.some(e => /^(main:|preload:|load:|Renderer exited:)/.test(e));
          finish(mounted && bridge && !fatal, mounted && bridge ? undefined : 'Renderer or preload bridge did not satisfy startup gates.');
        } catch (error) { finish(false, `inspection: ${error.message}`); }
      }, Number(value('--capture-delay', '6500')));
    });
  });
}
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf8'));
  const entry = path.resolve(appDir, manifest.main);
  if (path.relative(appDir, entry).startsWith('..')) throw new Error('Invalid application entrypoint.');
  require(entry);
} catch (error) {
  if (smoke) finish(false, `main: ${error.stack ?? error.message}`);
  else throw error;
}


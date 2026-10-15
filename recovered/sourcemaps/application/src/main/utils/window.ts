import path from 'node:path';

import { app, BrowserWindow, screen, type WebContents } from 'electron';
import escapeHtml from 'lodash/escape';

/**
 * Language label map for notification popup selectors.
 * Mirrors LANGUAGE_NATIVE_LABEL_MAP from renderer entities.
 */
const LOCALE_LABELS: Record<string, Record<string, string>> = {
  ko: {
    '': '다국어',
    ko_KR: '한국어',
    en_US: '영어',
    ja_JP: '일본어',
    de_DE: '독일어',
    es_ES: '스페인어',
    fr_FR: '프랑스어',
    it_IT: '이탈리아어',
    vi_VN: '베트남어',
    id_ID: '인도네시아어',
    zh_CN: '중국어',
    th_TH: '태국어',
    sv_SE: '스웨덴어',
    ms_MY: '말레이어',
    ru_RU: '러시아어',
    hi_IN: '힌디어',
  },
  en: {
    '': 'Multi-language',
    ko_KR: 'Korean',
    en_US: 'English',
    ja_JP: 'Japanese',
    de_DE: 'German',
    es_ES: 'Spanish',
    fr_FR: 'French',
    it_IT: 'Italian',
    vi_VN: 'Vietnamese',
    id_ID: 'Indonesian',
    zh_CN: 'Chinese',
    th_TH: 'Thai',
    sv_SE: 'Swedish',
    ms_MY: 'Malay',
    ru_RU: 'Russian',
    hi_IN: 'Hindi',
  },
  ja: {
    '': '多言語',
    ko_KR: '韓国語',
    en_US: '英語',
    ja_JP: '日本語',
    de_DE: 'ドイツ語',
    es_ES: 'スペイン語',
    fr_FR: 'フランス語',
    it_IT: 'イタリア語',
    vi_VN: 'ベトナム語',
    id_ID: 'インドネシア語',
    zh_CN: '中国語',
    th_TH: 'タイ語',
    sv_SE: 'スウェーデン語',
    ms_MY: 'マレー語',
    ru_RU: 'ロシア語',
    hi_IN: 'ヒンディー語',
  },
};

const TRANSCRIPTION_LOCALE_VALUES = [
  '',
  'ko_KR',
  'en_US',
  'ja_JP',
  'de_DE',
  'es_ES',
  'fr_FR',
  'it_IT',
  'vi_VN',
  'id_ID',
  'zh_CN',
  'th_TH',
  'sv_SE',
  'ms_MY',
  'ru_RU',
  'hi_IN',
];

const SUMMARY_LOCALE_VALUES = [
  '',
  'ko_KR',
  'en_US',
  'ja_JP',
  'de_DE',
  'es_ES',
  'fr_FR',
  'it_IT',
  'vi_VN',
  'id_ID',
  'zh_CN',
  'th_TH',
  'sv_SE',
  'ms_MY',
  'ru_RU',
  'hi_IN',
];

/**
 * Build locale select options for notification popup language selectors.
 */
export const getLocaleSelectOptions = (
  appLocale: string,
): {
  transcribeLocales: Array<{ value: string; label: string }>;
  summaryLocales: Array<{ value: string; label: string }>;
} => {
  const labels = LOCALE_LABELS[appLocale] || LOCALE_LABELS['en'];
  return {
    transcribeLocales: TRANSCRIPTION_LOCALE_VALUES.map((v) => ({
      value: v,
      label: labels[v] || v,
    })),
    summaryLocales: SUMMARY_LOCALE_VALUES.map((v) => ({
      value: v,
      label: labels[v] || v,
    })),
  };
};

/**
 * Create main window
 */
export const createMainWindow = (): BrowserWindow => {
  const { workAreaSize } = screen.getPrimaryDisplay();
  const isMac = process.platform === 'darwin';
  const isWindows = process.platform === 'win32';

  const maxDefaultWidth = Math.round(workAreaSize.width * 0.9);
  const maxDefaultHeight = Math.round(workAreaSize.height * 0.9);
  const minWidth = Math.min(900, maxDefaultWidth);
  const minHeight = Math.min(800, maxDefaultHeight);

  const window = new BrowserWindow({
    width: minWidth,
    height: minHeight,
    minWidth: 500,
    minHeight: 350,
    autoHideMenuBar: true,
    // Start hidden and reveal on 'ready-to-show' (see createAndSetupMainWindow)
    // so users never see the blank/white frame Electron paints before the
    // renderer's first frame is ready.
    show: false,
    // Ensure window appears in Dock and Command+Tab
    skipTaskbar: false,
    webPreferences: {
      // Default backgroundThrottling (enabled): a hidden/idle main window
      // throttles instead of burning CPU. While recording we turn throttling
      // off at runtime via setBackgroundThrottling(false) so background
      // capture/streaming isn't paused (see 'overlay:set-recording-state').
      preload: path.join(__dirname, 'preload.js'),
      devTools: process.env.NODE_ENV === 'development',
    },

    // Title bar style
    titleBarStyle: isMac ? 'hiddenInset' : isWindows ? 'hidden' : 'hidden',
    visualEffectState: isMac ? 'active' : undefined,
    frame: isWindows,
    transparent: isMac,
    vibrancy: isMac ? 'titlebar' : undefined,
    trafficLightPosition: isMac ? { x: 12, y: 12 } : undefined,
    titleBarOverlay: isWindows
      ? {
          color: 'rgba(0, 0, 0, 0)',
          symbolColor: 'rgba(87, 83, 78, 0.72)',
          height: 36,
        }
      : false,
    resizable: true,
    movable: true,
    minimizable: true,
    maximizable: true,
    fullscreenable: true,
  });

  // Load the content
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    window.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // [Windows] Ctrl+Q quits the app.
  // macOS already binds Cmd+Q via its default application menu, but Windows has
  // no such default and the tray menu's `Ctrl+Q` accelerator is display-only
  // (not a working key binding). We bind it here at the window level so it
  // fires only while a Tiro window is focused — the platform-standard scope for
  // a quit shortcut (cf. the Escape handler on the notification window).
  if (isWindows) {
    window.webContents.on('before-input-event', (event, input) => {
      if (
        input.type === 'keyDown' &&
        input.control &&
        !input.alt &&
        !input.meta &&
        !input.shift &&
        input.key.toLowerCase() === 'q'
      ) {
        event.preventDefault();
        app.quit();
      }
    });
  }

  return window;
};

/**
 * Create child window
 */
export const createChildWindow = ({
  parentWindow,
  url,
}: {
  parentWindow: BrowserWindow;
  url: string;
}) => {
  const window = new BrowserWindow({
    width: 600,
    height: 600,
    parent: parentWindow,
    resizable: false,
    show: false,
    modal: true,
    closable: true,
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
    },
  });

  // Load the content
  window.loadURL(url);
  window.show();

  window.webContents.on('before-input-event', (_, input) => {
    if (input.type === 'keyDown' && input.key === 'Escape') {
      window.close();
    }
  });

  return window;
};

/**
 * Focus window
 *
 * macOS는 background app이 foreground app으로부터 포커스를 빼앗는 걸 막는다.
 * 그래서 트레이 메뉴처럼 Tiro가 background인 상태에서 호출되는 경로에서는
 * `BrowserWindow.focus()` 만으론 창이 앞으로 안 나온다 (visible-but-behind
 * 상태일 때 특히). `app.focus({ steal: true })` 로 OS에 명시적 활성화를
 * 요청해야 안정적으로 전경 전환이 된다.
 */
export const focusWindow = (window: BrowserWindow, forceFocus = false) => {
  if (window.isDestroyed()) return;

  if (!window.isVisible()) window.show();
  if (window.isMinimized()) window.restore();

  // Only focus if explicitly requested (user action)
  if (forceFocus) {
    if (process.platform === 'darwin') {
      app.focus({ steal: true });
    }
    window.focus();
  }
};

// The notification and overlay windows render data: HTML built in main, and the
// notification shows calendar titles from external invites. They get no Node,
// an isolated world, and only the calls their own preload exposes.
const isolatedWebPreferences = (preloadFile: string) => ({
  nodeIntegration: false,
  contextIsolation: true,
  sandbox: true,
  preload: path.join(__dirname, preloadFile),
});

// The preload re-runs on every navigation, so keep these windows and any
// subframe on their data: page and never let them open another one.
const blockNavigation = (window: BrowserWindow) => {
  window.webContents.on('will-frame-navigate', (event) =>
    event.preventDefault(),
  );
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
};

const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

// The deep link stays in main. The renderer only reports which locales were
// picked, and only a notification window registered here can trigger it.
const notificationActions = new WeakMap<
  WebContents,
  {
    callbackUrl: string;
    transcribeLocales?: string[];
    summaryLocales?: string[];
  }
>();

export const resolveNotificationActionUrl = (
  sender: WebContents,
  locales?: { transcribeLocale?: unknown; summaryLocale?: unknown },
): string | null => {
  const action = notificationActions.get(sender);
  if (!action) return null;
  if (!action.transcribeLocales || !action.summaryLocales) {
    notificationActions.delete(sender);
    return action.callbackUrl;
  }

  const transcribeLocale = locales?.transcribeLocale;
  const summaryLocale = locales?.summaryLocale;
  if (
    typeof transcribeLocale !== 'string' ||
    typeof summaryLocale !== 'string' ||
    !action.transcribeLocales.includes(transcribeLocale) ||
    !action.summaryLocales.includes(summaryLocale)
  ) {
    return null;
  }

  // One click, one deep link: the action is spent once it resolves.
  notificationActions.delete(sender);
  const separator = action.callbackUrl.includes('?') ? '&' : '?';
  return `${action.callbackUrl}${separator}transcribeLocale=${encodeURIComponent(transcribeLocale)}&summaryLocale=${encodeURIComponent(summaryLocale)}&autoStart=true`;
};

/**
 * Create a custom notification window
 */
export const createNotificationWindow = (payload: {
  title: string;
  body: string;
  action?: { text: string; callbackUrl: string };
  calendarColor?: string;
  languageSelect?: {
    transcribeLocale: string;
    summaryLocale: string;
    transcribeLocales: Array<{ value: string; label: string }>;
    summaryLocales: Array<{ value: string; label: string }>;
    startRecordingText: string;
  };
}) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const hasLanguageSelect = !!payload.languageSelect;
  const windowWidth = hasLanguageSelect ? 480 : 372;
  const windowHeight = hasLanguageSelect ? 112 : 82;

  const notificationWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: width - windowWidth - 10,
    y: process.platform === 'darwin' ? 52 : height - windowHeight - 14,
    frame: false,
    transparent: true,
    thickFrame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    show: false, // Don't show immediately to prevent focus stealing
    focusable: false, // Prevent window from stealing focus
    webPreferences: isolatedWebPreferences('notificationPreload.js'),
  });
  blockNavigation(notificationWindow);

  if (payload.action) {
    notificationActions.set(notificationWindow.webContents, {
      callbackUrl: payload.action.callbackUrl,
      transcribeLocales: payload.languageSelect?.transcribeLocales.map(
        (l) => l.value,
      ),
      summaryLocales: payload.languageSelect?.summaryLocales.map(
        (l) => l.value,
      ),
    });
  }

  // PLT-5164: the renderer closes this window via `window.close()`, which
  // destroys it synchronously. Destroying a transparent + frameless window
  // while it is still composited crashes the main process natively on Windows
  // (it took the whole app down when the calendar notification was closed).
  // Hide it first so it leaves the compositor, then destroy on the next tick
  // when teardown is safe. macOS closes/destroys directly.
  if (process.platform === 'win32') {
    let willDestroy = false;
    notificationWindow.on('close', (event) => {
      if (willDestroy || notificationWindow.isDestroyed()) return;
      willDestroy = true;
      event.preventDefault();
      notificationWindow.hide();
      setTimeout(() => {
        if (!notificationWindow.isDestroyed()) notificationWindow.destroy();
      }, 100);
    });
  }

  // Create HTML content for the notification
  // calendarColor lands in CSS, where HTML escaping doesn't apply.
  const calendarColor = HEX_COLOR.test(payload.calendarColor ?? '')
    ? payload.calendarColor
    : '#22C55E'; // green-500
  // Every string below lands in HTML text or a quoted attribute.
  const title = escapeHtml(payload.title);
  const body = escapeHtml(payload.body);
  const actionText = escapeHtml(payload.action?.text);
  const startRecordingText = escapeHtml(
    payload.languageSelect?.startRecordingText,
  );
  const localeOptions = (
    locales: Array<{ value: string; label: string }>,
    selected: string,
  ) =>
    locales
      .map(
        (l) =>
          `<option value="${escapeHtml(l.value)}" ${l.value === selected ? 'selected' : ''}>${escapeHtml(l.label)}</option>`,
      )
      .join('');
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          border: none;
          padding: 0;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: transparent;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        
        .notification {
          background: transparent;
          border-radius: 0;
          border: none;
          padding: 10px 0px 2px 10px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          animation: slideIn 0.1s ease-out forwards;
          transform: translateX(100%);
          position: relative;
        }

        .notification-container {
          border: none;
          width: ${hasLanguageSelect ? 'auto' : '360px'};
          ${hasLanguageSelect ? 'max-width: 420px;' : ''}
          height: ${hasLanguageSelect ? '98px' : '70px'};
          padding: ${hasLanguageSelect ? '10px 16px' : '8px 12px'};
          background: var(--tds-color-bg-subtle, #F5F5F4);
          border-radius: 10px;
          border: 1px solid var(--tds-color-bd-base, #E7E5E4);
          position: relative;
          display: flex;
          ${hasLanguageSelect ? 'flex-direction: row; align-items: center; gap: 24px;' : 'justify-content: space-between; align-items: center; gap: 16px;'}
          overflow: visible;
          box-sizing: border-box;
        }

        .meeting-left {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          flex-shrink: 1;
        }

        .controls-right {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          flex-shrink: 0;
          width: 200px;
        }

        .language-selectors {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
        }

        .lang-select-wrapper {
          display: flex;
          align-items: center;
          gap: 4px;
          background: white;
          border: 1px solid var(--tds-color-bd-base, #E7E5E4);
          border-radius: 8px;
          padding: 0 8px;
          height: 30px;
          width: 97px;
          box-sizing: border-box;
          cursor: pointer;
          flex-shrink: 0;
        }

        .lang-icon {
          flex-shrink: 0;
          line-height: 0;
          display: flex;
          align-items: center;
          color: var(--tds-color-fg-muted, #78716C);
        }

        .lang-icon svg {
          width: 14px;
          height: 14px;
        }

        .lang-select {
          border: none;
          background: transparent;
          font-size: 12px;
          font-weight: 500;
          color: var(--tds-color-fg-base, #1C1917);
          outline: none;
          cursor: pointer;
          padding: 0;
          padding-right: 4px;
          flex: 1;
          min-width: 0;
          text-overflow: ellipsis;
        }


        .start-recording-btn {
          height: 32px;
          padding: 0 14px;
          font-size: 12px;
          font-weight: 600;
          background: var(--tds-color-bg-neutral, #292524);
          color: white;
          border-radius: 8px;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          white-space: nowrap;
          -webkit-app-region: no-drag;
          width: 100%;
          box-sizing: border-box;
        }

        .start-recording-btn:hover {
          background: var(--tds-color-bg-neutral-pressed, #1C1917);
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        @keyframes slideOut {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        
        .notification-close {
          position: absolute;
          top: -8px;
          left: -8px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: white;
          color: var(--tds-color-fg-subtle, #57534E);
          font-size: 12px;
          box-shadow: var(--tds-elevation-floating, 0 4px 12px -2px rgba(28, 25, 23, 0.16));
          border: 1px solid var(--tds-color-bd-base, #E7E5E4);
          -webkit-app-region: no-drag;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .notification-container:hover .notification-close {
          opacity: 1;
        }

        .notification-close:hover {
          opacity: 0.8;
        }
        
        .calendar-indicator {
          width: 4px;
          height: 40px;
          background-color: ${calendarColor};
          border-radius: 30px;
          flex-shrink: 0;
        }
        
        .meeting-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 0;
          max-width: 190px;
          min-width: 0;
        }
        
        .meeting-title {
          width: 100%;
          color: var(--tds-color-fg-base, #1C1917);
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 190px;
          min-width: 0;
          white-space: nowrap;
          user-select: none;
        }
        
        .meeting-time {
          width: 100%;
          color: var(--tds-color-fg-on-neutral-muted, #A8A29E);
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 190px;
          min-width: 0;
          user-select: none;
        }
        
        .action-section {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        
        .create-note-btn {
          height: 48px;
          padding: 8px 16px;
          font-size: 12px;
          background: white;
          border-radius: 12px;
          border: 1px solid var(--tds-color-bd-base, #E7E5E4);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          -webkit-app-region: no-drag;
        }
        
        .create-note-btn:hover {
          background: var(--tds-color-bg-base, #FAFAF9);
        }
        
        .create-note-btn .icon {
          width: 20px;
          height: 20px;
          background: url('https://cdn.tiro.ooo/tiro-logo.png') center/contain no-repeat;
        }
        
        .create-note-btn .text {
          width: 72px;
          color: var(--tds-color-fg-base, #1C1917);
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          text-align: center;
        }
        
        .progress-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          overflow: hidden;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        
        .progress-bar {
          height: 100%;
          width: 100%;
          background-color: ${calendarColor};
          opacity: 0.3;
          animation: countdown 15s linear forwards;
          transform-origin: left;
        }
        
        @keyframes countdown {
          0% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      </style>
    </head>
    <body>
      <div class="notification" id="notification">
        <div class="notification-container">
          <div class="notification-close" id="close-btn">✕</div>
          ${
            hasLanguageSelect
              ? `
          <div class="meeting-left">
            <div class="calendar-indicator"></div>
            <div class="meeting-content">
              <div class="meeting-title">${title}</div>
              <div class="meeting-time">${body}</div>
            </div>
          </div>
          <div class="controls-right">
            <div class="language-selectors">
              <div class="lang-select-wrapper">
                <span class="lang-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg></span>
                <select class="lang-select" id="transcribe-locale">
                  ${localeOptions(payload.languageSelect!.transcribeLocales, payload.languageSelect!.transcribeLocale)}
                </select>
              </div>
              <div class="lang-select-wrapper">
                <span class="lang-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg></span>
                <select class="lang-select" id="summary-locale">
                  ${localeOptions(payload.languageSelect!.summaryLocales, payload.languageSelect!.summaryLocale)}
                </select>
              </div>
            </div>
            <button class="start-recording-btn" id="action-0">
              ${startRecordingText}
            </button>
          </div>
          `
              : `
          <div class="calendar-indicator"></div>
          <div class="meeting-content">
            <div class="meeting-title">${title}</div>
            <div class="meeting-time">${body}</div>
          </div>
          ${
            payload.action
              ? `
          <div class="action-section">
            <button class="create-note-btn" id="action-0">
              <div class="icon"></div>
              <div class="text">${actionText}</div>
            </button>
          </div>
          `
              : ''
          }
          `
          }
        </div>
      </div>
    </body>
    </html>
  `;

  notificationWindow.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`,
  );

  // Handle close button click and action button clicks
  notificationWindow.webContents.on('dom-ready', () => {
    // Close button handler
    notificationWindow.webContents.executeJavaScript(`
      // Auto-dismiss timer (30 seconds)
      let autoDismissTimer = null;
      
      // Function to close notification with animation
      function closeNotification() {
        if (autoDismissTimer) {
          clearTimeout(autoDismissTimer);
          autoDismissTimer = null;
        }
        
        const notification = document.getElementById('notification');
        notification.style.animation = 'slideOut 0.1s ease-in forwards';
        
        setTimeout(() => {
          document.body.style.background = 'rgba(0, 0, 0, 0)';
          document.getElementById('notification').style.boxShadow = 'none';
          document.getElementById('notification').style.background = 'rgba(0, 0, 0, 0)';
          
          setTimeout(() => {
            window.close();
          }, 50);
        }, 150);
      }
      
      // Set up auto-dismiss timer (30 seconds)
      autoDismissTimer = setTimeout(() => {
        closeNotification();
      }, 30000);
      
      document.getElementById('close-btn').addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        closeNotification();
      });

      // Interactive-region exception for the window's click-through default:
      // while the pointer is over the visible card, disable pass-through so its
      // buttons/selectors are clickable; when it leaves, restore pass-through so
      // clicks over the transparent area reach the window underneath.
      (() => {
        const container = document.querySelector('.notification-container');
        if (!container) return;
        container.addEventListener('mouseenter', () => {
          window.notification.setIgnoreMouse(false);
        });
        container.addEventListener('mouseleave', () => {
          window.notification.setIgnoreMouse(true);
        });
      })();
    `);

    // Setup action button handler. Main holds the callback URL (see
    // resolveNotificationActionUrl); the page only reports the picked locales.
    if (payload.action) {
      if (hasLanguageSelect) {
        notificationWindow.webContents.executeJavaScript(`
          document.getElementById('action-0').addEventListener('click', async () => {
            await window.notification.runAction({
              transcribeLocale: document.getElementById('transcribe-locale').value,
              summaryLocale: document.getElementById('summary-locale').value,
            });
            closeNotification();
          });
        `);
      } else {
        notificationWindow.webContents.executeJavaScript(`
          document.getElementById('action-0').addEventListener('click', async () => {
            await window.notification.runAction();

            // Close the notification (this will also clear the timer)
            closeNotification();
          });
        `);
      }
    }
  });

  // Show window without stealing focus
  notificationWindow.showInactive();
  // Click-through by default: this window is transparent and larger than its
  // visible card (right-aligned + slide-in margin), so without this the
  // transparent area swallows clicks meant for the window underneath (the main
  // window's play / end-recording controls — most visible on Windows where the
  // popup sits bottom-right over them). `forward: true` still delivers mousemove
  // so the card can re-enable interaction on hover (see the dom-ready script).
  notificationWindow.setIgnoreMouseEvents(true, { forward: true });
  notificationWindow.setAlwaysOnTop(true, 'floating');
  // TODO: visibleOnFullScreen: true 를 넣고도 데스크탑이 꺼지지 않게 수정해야 함
  notificationWindow.setVisibleOnAllWorkspaces(true);
  return notificationWindow;
};

/**
 * Create overlay window for recording indicator
 */
export const createOverlayWindow = (options?: {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}) => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } =
    primaryDisplay.workAreaSize;

  // Default dimensions: horizontal pill layout
  const overlayWidth = options?.width ?? 84;
  const overlayHeight = options?.height ?? 66;
  const padding = 20;

  const window = new BrowserWindow({
    width: overlayWidth,
    height: overlayHeight,
    x: options?.x ?? screenWidth - overlayWidth - padding,
    y: options?.y ?? screenHeight - overlayHeight - padding,
    alwaysOnTop: true,
    skipTaskbar: true,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    resizable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    hasShadow: false,
    acceptFirstMouse: true,
    focusable: true, // Allow focus for dragging
    fullscreenable: false,
    webPreferences: isolatedWebPreferences('overlayPreload.js'),
  });
  blockNavigation(window);

  // Set always on top with highest level
  window.setAlwaysOnTop(true, 'floating');
  window.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
  });

  window.on('enter-full-screen', () => {
    if (!window.isDestroyed()) window.setFullScreen(false);
  });

  return window;
};

/**
 * Enter meeting mode - resize and position window to the right half of screen
 */
export const enterMeetingMode = (
  window: BrowserWindow,
  focusWindow = false,
) => {
  if (window.isDestroyed()) return;

  const { workAreaSize } = screen.getPrimaryDisplay();

  // Calculate right half dimensions
  const meetingModeWidth = 500;
  const meetingModeHeight = Math.round(workAreaSize.height); // 100% of screen height
  const meetingModeX = workAreaSize.width - meetingModeWidth;
  const meetingModeY = Math.round(
    (workAreaSize.height - meetingModeHeight) / 2,
  ); // Center vertically

  // Set new bounds
  window.setBounds({
    x: meetingModeX,
    y: meetingModeY,
    width: meetingModeWidth,
    height: meetingModeHeight,
  });

  // Ensure window is visible
  if (window.isMinimized()) window.restore();

  // Only focus if explicitly requested (user action)
  if (focusWindow) {
    window.focus();
  }
};

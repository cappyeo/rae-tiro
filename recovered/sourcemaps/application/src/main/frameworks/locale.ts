import { app } from 'electron';
import Store from 'electron-store';
import i18next, { type TOptions } from 'i18next';

import { getTranslationEN } from '../../locales/en';
import { getTranslationJA } from '../../locales/ja';
import { getTranslationKO } from '../../locales/ko';

type SupportedLocale = 'en' | 'ko' | 'ja';

const getResources = async () => ({
  en: { translation: await getTranslationEN() },
  ko: { translation: await getTranslationKO() },
  ja: { translation: await getTranslationJA() },
});

let store: Store<{ locale?: SupportedLocale }> | null = null;

const getStore = (): Store<{ locale?: SupportedLocale }> => {
  store ??= new Store<{ locale?: SupportedLocale }>();
  return store;
};

const normalizeLocale = (input?: string): SupportedLocale => {
  const value = (input || '').toLowerCase();
  if (value.startsWith('ko')) return 'ko';
  if (value.startsWith('ja')) return 'ja';
  return 'en';
};

const i18n = i18next.createInstance();

export const initMainI18n = async (): Promise<void> => {
  const saved = getStore().get('locale');
  const initial = normalizeLocale(saved ?? app.getLocale());

  await i18n.init({
    resources: await getResources(),
    lng: initial,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
};

export const setMainLocale = async (language: string): Promise<void> => {
  const normalized = normalizeLocale(language);
  if (i18n.language !== normalized) {
    await i18n.changeLanguage(normalized);
  }
  getStore().set('locale', normalized);
};

export const t = (key: string, options?: TOptions): string => {
  return i18n.t(key, options);
};

export const getCurrentLocale = (): SupportedLocale => {
  return (i18n.language as SupportedLocale) || 'en';
};

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'

export const defaultNS = 'translation' as const

const LOCALE_STORAGE_KEY = 'demitierra-locale'
const LEGACY_LOCALE_STORAGE_KEY = 'desnudo-locale'

function detectLocale(): 'en' | 'es' {
  try {
    const stored =
      localStorage.getItem(LOCALE_STORAGE_KEY) ??
      localStorage.getItem(LEGACY_LOCALE_STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined') {
    const short = navigator.language.slice(0, 2).toLowerCase()
    if (short === 'es') return 'es'
  }
  return 'en'
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: detectLocale(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  defaultNS,
})

export type AppLocale = 'en' | 'es'

export function setLocale(lng: AppLocale): void {
  void i18n.changeLanguage(lng)
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, lng)
    localStorage.removeItem(LEGACY_LOCALE_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

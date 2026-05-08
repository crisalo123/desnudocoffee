import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'

export const defaultNS = 'translation' as const

function detectLocale(): 'en' | 'es' {
  try {
    const stored = localStorage.getItem('desnudo-locale')
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
    localStorage.setItem('desnudo-locale', lng)
  } catch {
    /* ignore */
  }
}

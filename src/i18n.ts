import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

// Determine default locale from localStorage or browser language
const getBrowserLang = () => {
  const lang = navigator.language.split('-')[0]
  return ['en', 'zh'].includes(lang) ? lang : 'en'
}
const savedLang = localStorage.getItem('memoh-lang')
const defaultLocale = savedLang || getBrowserLang()

export const i18n = createI18n({
  legacy: false, // use Composition API
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

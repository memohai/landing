import { useI18n } from 'vue-i18n'

const TA_SPAN = '<em style="font-style:normal;color:inherit">它</em>'

export function useTa() {
  const { t, locale } = useI18n()

  function th(key: string, params?: Record<string, unknown>): string {
    const raw = params ? t(key, params) : t(key)
    if (locale.value !== 'zh') return raw
    return raw.replace(/%TA%/g, TA_SPAN)
  }

  return { th }
}

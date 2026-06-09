import { computed, ref } from 'vue'

export type ColorScheme = 'dark' | 'light'

/**
 * Single source of truth for the user's *persisted* color scheme.
 *
 * Intentionally does NOT touch the DOM — applying the `dark` class to <html>
 * happens in exactly one place (App.vue), so the home page can render dark
 * without ever overwriting this stored preference. Reuses the existing
 * `vueuse-color-scheme` key so previously saved choices carry over.
 */
const storageKey = 'vueuse-color-scheme'

const getInitialColorScheme = (): ColorScheme => {
  if (typeof window === 'undefined') return 'dark'
  return window.localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark'
}

const stored = ref<ColorScheme>(getInitialColorScheme())

const persistColorScheme = (value: ColorScheme) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(storageKey, value)
}

export function useThemePreference() {
  const isDark = computed<boolean>({
    get: () => stored.value !== 'light',
    set: (value) => {
      stored.value = value ? 'dark' : 'light'
      persistColorScheme(stored.value)
    },
  })

  const toggle = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}

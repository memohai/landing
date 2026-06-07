import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

export type ColorScheme = 'dark' | 'light'

/**
 * Single source of truth for the user's *persisted* color scheme.
 *
 * Intentionally does NOT touch the DOM — applying the `dark` class to <html>
 * happens in exactly one place (App.vue), so the home page can render dark
 * without ever overwriting this stored preference. Reuses the existing
 * `vueuse-color-scheme` key so previously saved choices carry over.
 */
const stored = useStorage<ColorScheme>('vueuse-color-scheme', 'dark')

export function useThemePreference() {
  const isDark = computed<boolean>({
    get: () => stored.value !== 'light',
    set: (value) => {
      stored.value = value ? 'dark' : 'light'
    },
  })

  const toggle = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}

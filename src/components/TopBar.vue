<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import { Moon, Sun, Languages, ChevronDown, Menu, X, Github } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

defineProps<{
  brandSuffix?: string
  hideNav?: boolean
}>()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { locale } = useI18n()

const isLangOpen = ref(false)
const langMenuRef = ref<HTMLElement | null>(null)

onClickOutside(langMenuRef, () => {
  isLangOpen.value = false
})

const isMobileMenuOpen = ref(false)

const toggleLangMenu = () => {
  isLangOpen.value = !isLangOpen.value
}

const selectLang = (lang: string) => {
  locale.value = lang
  localStorage.setItem('memoh-lang', lang)
  isLangOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full backdrop-blur flex justify-center bg-background/80 shadow-none">
    <div class="max-w-[1080px] w-full h-14 px-4 md:px-8 flex items-center justify-between relative after:absolute after:bottom-0 after:left-4 after:right-4 md:after:left-8 md:after:right-8 after:h-px after:bg-border">
      <div class="flex items-center gap-4 sm:gap-6 md:gap-10 overflow-hidden">
        <RouterLink to="/" class="flex items-center shrink-0 gap-2">
          <img src="/logo.png" alt="Memoh Logo" class="w-6 h-6 object-contain" />
          <span class="font-bold text-lg tracking-tight text-foreground">
            Memoh<span v-if="brandSuffix" class="ml-1.5 font-medium text-muted-foreground">{{ brandSuffix }}</span>
          </span>
        </RouterLink>
        <nav v-if="!hideNav" class="hidden md:flex items-center gap-1 sm:gap-2">
          <a href="https://docs.memoh.ai" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">{{ $t('nav.docs') }}</a>
          <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">{{ $t('nav.supermarket') }}</a>
          <RouterLink to="/desktop" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap" active-class="text-foreground bg-accent">{{ $t('nav.desktop') }}</RouterLink>
        </nav>
      </div>

      <div class="flex items-center ml-2 sm:ml-4 shrink-0 gap-2">
        <a href="https://github.com/memohai/Memoh"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="GitHub"
           class="flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none border border-transparent hover:border-border">
          <Github class="w-4 h-4 shrink-0" />
        </a>

        <div class="relative flex items-center" ref="langMenuRef">
          <button @click="toggleLangMenu"
                  class="flex items-center justify-center gap-1.5 px-2 h-9 rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none border border-transparent hover:border-border"
                  aria-label="Select language">
            <Languages class="w-4 h-4 shrink-0" />
            <span class="text-[10px] font-bold tracking-tighter">{{ locale === 'zh' ? 'ZH' : 'EN' }}</span>
            <ChevronDown class="w-3 h-3 shrink-0 opacity-50 transition-transform duration-200" :class="{ 'rotate-180': isLangOpen }" />
          </button>

          <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="isLangOpen"
                 class="absolute top-full right-0 mt-1.5 w-32 rounded-md border border-border bg-background shadow-lg z-50 overflow-hidden py-1">
              <button @click="selectLang('en')"
                      class="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                      :class="{ 'text-foreground bg-accent/50': locale === 'en', 'text-muted-foreground': locale !== 'en' }">
                <span>English</span>
                <span class="text-[10px] font-bold border border-current rounded px-1 scale-90">EN</span>
              </button>
              <button @click="selectLang('zh')"
                      class="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                      :class="{ 'text-foreground bg-accent/50': locale === 'zh', 'text-muted-foreground': locale !== 'zh' }">
                <span>中文</span>
                <span class="text-[10px] font-bold border border-current rounded px-1 scale-90">ZH</span>
              </button>
            </div>
          </Transition>
        </div>

        <button @click="toggleDark()"
                class="flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none border border-transparent hover:border-border"
                aria-label="Toggle theme">
          <Sun v-if="isDark" class="w-4 h-4 shrink-0" />
          <Moon v-else class="w-4 h-4 shrink-0" />
        </button>

        <button v-if="!hideNav" @click="isMobileMenuOpen = !isMobileMenuOpen"
                class="md:hidden flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none border border-transparent hover:border-border"
                aria-label="Toggle mobile menu">
          <Menu v-if="!isMobileMenuOpen" class="w-4 h-4 shrink-0" />
          <X v-else class="w-4 h-4 shrink-0" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="isMobileMenuOpen && !hideNav" class="md:hidden absolute top-[57px] left-0 w-full border-b border-border bg-background/95 backdrop-blur z-40 px-4 py-4 flex flex-col gap-2 shadow-sm">
        <a href="https://docs.memoh.ai" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-foreground hover:bg-accent rounded-md px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" @click="isMobileMenuOpen = false">{{ $t('nav.docs') }}</a>
        <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-foreground hover:bg-accent rounded-md px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" @click="isMobileMenuOpen = false">{{ $t('nav.supermarket') }}</a>
        <RouterLink to="/desktop" class="font-medium text-sm text-foreground hover:bg-accent rounded-md px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" active-class="bg-accent" @click="isMobileMenuOpen = false">{{ $t('nav.desktop') }}</RouterLink>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import { Moon, Sun, Store, Code2, Smartphone, Languages, ChevronDown, Menu, X } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '@unhead/vue'
import HeroSection from './components/HeroSection.vue'
import InstallModule from './components/InstallModule.vue'
import UseCasesGrid from './components/UseCasesGrid.vue'
import FeatureGallery from './components/FeatureGallery.vue'
import BackgroundCanvas from './components/BackgroundCanvas.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { locale, t } = useI18n()

// SEO Meta Management
useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogUrl: 'https://memoh.ai',
  ogImage: 'https://memoh.ai/hero.png',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
})

// Additional Head Management
useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  link: [
    {
      rel: 'canonical',
      href: 'https://memoh.ai',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'MemohAI',
        'operatingSystem': 'Linux, Docker',
        'applicationCategory': 'BusinessApplication, DeveloperApplication',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'description': t('seo.description'),
        'author': {
          '@type': 'Organization',
          'name': 'MemohAI'
        }
      })),
    },
  ],
})

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
  <div class="min-h-screen font-sans overflow-x-hidden bg-background text-foreground">
    <!-- Global subtle glow background -->
    <BackgroundCanvas />
    
    <!-- Center the content area -->
    <div class="w-full flex flex-col items-center">
      
      <!-- Navigation -->
      <header class="sticky top-0 z-50 w-full backdrop-blur flex justify-center bg-background/80 shadow-none">
        <div class="max-w-[1080px] w-full h-14 px-4 md:px-8 flex items-center justify-between relative after:absolute after:bottom-0 after:left-4 after:right-4 md:after:left-8 md:after:right-8 after:h-px after:bg-border">
          <div class="flex items-center gap-4 sm:gap-6 md:gap-10 overflow-hidden">
            <a href="https://github.com/memohai/Memoh" target="_blank" rel="noopener noreferrer" class="flex items-center shrink-0 gap-2">
              <img src="/logo.png" alt="Memoh Logo" class="w-6 h-6 object-contain" />
              <span class="font-bold text-lg tracking-tight text-foreground">Memoh</span>
            </a>
            <nav class="hidden md:flex items-center gap-1 sm:gap-2">
              <a href="https://docs.memoh.ai" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">{{ $t('nav.docs') }}</a>
              <a href="https://github.com/memohai/Memoh" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">{{ $t('nav.github') }}</a>
              <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">{{ $t('nav.supermarket') }}</a>
            </nav>
          </div>
          
          <div class="flex items-center ml-2 sm:ml-4 shrink-0 gap-2">
            <!-- Language Switcher -->
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
<!-- Theme Toggle Button -->
            <button @click="toggleDark()" 
                    class="flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none border border-transparent hover:border-border" 
                    aria-label="Toggle theme">
              <Sun v-if="isDark" class="w-4 h-4 shrink-0" />
              <Moon v-else class="w-4 h-4 shrink-0" />
            </button>

            <!-- Mobile Menu Toggle Button -->
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" 
                    class="md:hidden flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none border border-transparent hover:border-border" 
                    aria-label="Toggle mobile menu">
              <Menu v-if="!isMobileMenuOpen" class="w-4 h-4 shrink-0" />
              <X v-else class="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform -translate-y-2 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-2 opacity-0"
        >
          <div v-if="isMobileMenuOpen" class="md:hidden absolute top-[57px] left-0 w-full border-b border-border bg-background/95 backdrop-blur z-40 px-4 py-4 flex flex-col gap-2 shadow-sm">
            <a href="https://docs.memoh.ai" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-foreground hover:bg-accent rounded-md px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" @click="isMobileMenuOpen = false">{{ $t('nav.docs') }}</a>
            <a href="https://github.com/memohai/Memoh" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-foreground hover:bg-accent rounded-md px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" @click="isMobileMenuOpen = false">{{ $t('nav.github') }}</a>
            <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-foreground hover:bg-accent rounded-md px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" @click="isMobileMenuOpen = false">{{ $t('nav.supermarket') }}</a>
          </div>
        </Transition>
      </header>

      <!-- ====== Dynamic hero animation module ====== -->
      <HeroSection />

      <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

      <!-- One-click installation module -->
      <InstallModule />

      <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

      <!-- Core use cases grid -->
      <UseCasesGrid />

      <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

      <!-- Module 3: Gallery replacing Architecture -->
      <FeatureGallery />

      <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

      <!-- Module 4: Memoh Ecosystem -->
      <section class="max-w-[800px] w-full py-[80px] flex flex-col gap-8 px-4 md:px-8">
        <h2 class="font-semibold text-xl md:text-2xl tracking-tight text-foreground">
          {{ $t('ecosystem.title') }}
        </h2>
        <div class="flex flex-col border border-border rounded-md bg-background overflow-hidden shadow-none">
          <!-- Row 1 -->
          <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-border hover:bg-accent transition-colors focus-visible:outline-none focus-visible:bg-accent group">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center text-foreground shrink-0">
                <Store :size="16" :stroke-width="2" />
              </div>
              <span class="font-medium text-sm text-foreground">{{ $t('ecosystem.e1.title') }}</span>
            </div>
            <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">{{ $t('ecosystem.e1.desc') }}</span>
          </a>
          <!-- Row 2 -->
          <a href="https://github.com/memohai/twilight-ai" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-border hover:bg-accent transition-colors focus-visible:outline-none focus-visible:bg-accent group">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center text-foreground shrink-0">
                <Code2 :size="16" :stroke-width="2" />
              </div>
              <span class="font-medium text-sm text-foreground">{{ $t('ecosystem.e2.title') }}</span>
            </div>
            <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">{{ $t('ecosystem.e2.desc') }}</span>
          </a>
          <!-- Row 3 -->
          <a href="https://github.com/memohai/Autofish" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:bg-accent group">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center text-foreground shrink-0">
                <Smartphone :size="16" :stroke-width="2" />
              </div>
              <span class="font-medium text-sm text-foreground">{{ $t('ecosystem.e3.title') }}</span>
            </div>
            <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">{{ $t('ecosystem.e3.desc') }}</span>
          </a>        </div>
      </section>

      <!-- Footer -->
      <footer class="w-full max-w-[1080px] py-[60px] relative after:absolute after:top-0 after:left-4 after:right-4 md:after:left-8 md:after:right-8 after:h-px after:bg-border flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8">
        <span class="text-sm text-muted-foreground">{{ $t('footer.copyright') }}</span>
        <div class="flex gap-6">
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ $t('footer.privacy') }}</a>
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ $t('footer.terms') }}</a>
        </div>
      </footer>

    </div>
  </div>
</template>
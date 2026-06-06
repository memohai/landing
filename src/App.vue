<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import { MapPin, Github, Twitter } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import BackgroundCanvas from './components/BackgroundCanvas.vue'
import TopBar from './components/TopBar.vue'
import EasterEgg from './components/EasterEgg.vue'

const { t } = useI18n()
const route = useRoute()
const isDark = useDark({ initialValue: 'dark' })

const isDesktopRoute = computed(() => route.path.startsWith('/desktop'))
const isHomeRoute = computed(() => route.path === '/')

watchEffect(() => {
  if (isHomeRoute.value) isDark.value = true
})
const brandSuffix = computed(() => (isDesktopRoute.value ? 'Desktop' : ''))

const isMemohNet = computed(() => {
  if (typeof window === 'undefined') {
    return false
  }
  const hostname = window.location.hostname.replace(/^www\./, '').toLowerCase()
  return hostname === 'memoh.net'
})

const memohNetAddress = 'Cloud Technology Building, No. 50 Liuxin 1st Road, Nanshan District, Shenzhen'
const footerAddress = computed(() => (isMemohNet.value ? memohNetAddress : t('footer.address')))
const miitBeianUrl = 'https://beian.miit.gov.cn/'
const telecomLicenseUrl = 'https://dxzhgl.miit.gov.cn/'

</script>

<template>
  <div class="min-h-screen font-sans overflow-x-hidden" :class="{ 'home-shell': isHomeRoute }">
    <BackgroundCanvas v-if="!isHomeRoute" />

    <div
      class="relative z-10 w-full"
      :class="{ 'home-scroll': isHomeRoute }"
    >
      <div
        class="w-full flex flex-col items-center"
        :class="{ 'home-gradient home-content': isHomeRoute }"
      >
        <TopBar :brand-suffix="brandSuffix" :hide-nav="isDesktopRoute" :overlay="isHomeRoute" :hide-theme-toggle="isHomeRoute" />

        <RouterView />

        <footer class="w-full max-w-[1080px] py-[60px] relative z-10 after:absolute after:top-0 after:left-4 after:right-4 md:after:left-8 md:after:right-8 after:h-px after:bg-border px-4 md:px-8">
        <div class="flex flex-col md:flex-row md:justify-between gap-10 md:gap-16">
          <!-- Brand block (left) -->
          <div class="flex flex-col gap-4 max-w-[320px]">
            <div class="flex items-center gap-2">
              <img src="/logo.png" alt="Memoh Logo" class="w-6 h-6 object-contain" />
              <span class="font-bold text-lg tracking-tight text-foreground">Memoh</span>
            </div>
            <p class="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{{ t('footer.tagline') }}</p>
            <div class="flex items-center gap-2">
              <a href="https://github.com/memohai/Memoh" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                 class="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Github class="w-4 h-4" />
              </a>
              <a href="https://x.com/memohai" target="_blank" rel="noopener noreferrer" aria-label="X"
                 class="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
                <Twitter class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- Link columns (right) -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            <div class="flex flex-col gap-3">
              <span class="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/55">{{ t('footer.product') }}</span>
              <router-link to="/desktop" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('nav.desktop') }}</router-link>
              <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('nav.supermarket') }}</a>
            </div>
            <div class="flex flex-col gap-3">
              <span class="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/55">{{ t('footer.resources') }}</span>
              <a href="https://docs.memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('nav.docs') }}</a>
              <a href="https://github.com/memohai/Memoh" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('nav.github') }}</a>
            </div>
            <div class="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span class="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/55">{{ t('footer.legal') }}</span>
              <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('footer.privacy') }}</a>
              <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('footer.terms') }}</a>
            </div>
          </div>
        </div>

        <!-- Bottom row: legal line -->
        <div class="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex flex-col gap-1">
            <span class="text-xs text-muted-foreground">{{ t('footer.copyright') }}</span>
            <div class="flex items-center gap-1 text-muted-foreground/60">
              <MapPin :size="10" />
              <span class="text-[10px]">{{ footerAddress }}</span>
            </div>
          </div>
          <div
            v-if="isMemohNet"
            class="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-muted/20 px-2 py-1 text-[10px] text-muted-foreground/75 leading-none whitespace-nowrap"
          >
            <a :href="miitBeianUrl" target="_blank" rel="noopener noreferrer" class="hover:text-muted-foreground transition-colors">
              粤ICP备2020082274号
            </a>
            <span aria-hidden="true" class="text-muted-foreground/45">｜</span>
            <a :href="telecomLicenseUrl" target="_blank" rel="noopener noreferrer" class="hover:text-muted-foreground transition-colors">
              增值电信业务经营许可证 B1-20214707
            </a>
          </div>
        </div>
        </footer>
      </div>
      <EasterEgg v-if="isHomeRoute" class="egg-snap" />
    </div>
  </div>
</template>

<style scoped>
/* Home page: page background fades from the purple-black used behind the
   dusk-journey cards (top) into the deeper near-black (#09090b) at the tail. */
.home-shell {
  height: 100vh;
  overflow: hidden;
  background: #09090b;
}

.home-scroll {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: auto;
  scroll-snap-type: y proximity;
}

.home-content {
  min-height: 100%;
  scroll-snap-align: end;
  scroll-snap-stop: always;
}

.home-gradient {
  background: linear-gradient(to bottom, #0c0c14 0%, #0c0c14 48%, #09090b 100%);
}

.egg-snap {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
</style>

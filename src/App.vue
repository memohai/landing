<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MapPin } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import BackgroundCanvas from './components/BackgroundCanvas.vue'
import TopBar from './components/TopBar.vue'

const { t } = useI18n()
const route = useRoute()

const isDesktopRoute = computed(() => route.path.startsWith('/desktop'))
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
</script>

<template>
  <div class="min-h-screen font-sans overflow-x-hidden">
    <BackgroundCanvas />

    <div class="w-full flex flex-col items-center">
      <TopBar :brand-suffix="brandSuffix" :hide-nav="isDesktopRoute" />

      <RouterView />

      <footer class="w-full max-w-[1080px] py-[60px] relative after:absolute after:top-0 after:left-4 after:right-4 md:after:left-8 md:after:right-8 after:h-px after:bg-border flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8">
        <div class="flex flex-col items-center sm:items-start gap-1">
          <span class="text-sm text-muted-foreground">{{ t('footer.copyright') }}</span>
          <div class="flex items-center gap-1 text-muted-foreground/60">
            <MapPin :size="10" />
            <span class="text-[10px]">{{ footerAddress }}</span>
          </div>
          <div
            v-if="isMemohNet"
            class="mt-1.5 inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-muted/20 px-2 py-1 text-[10px] text-muted-foreground/75 leading-none whitespace-nowrap"
          >
            <span>粤ICP备2020082274号</span>
            <span aria-hidden="true" class="text-muted-foreground/45">｜</span>
            <span>粤公网安备 44030902003142号</span>
            <span aria-hidden="true" class="text-muted-foreground/45">｜</span>
            <span>增值电信业务经营许可证 B1-20214707</span>
          </div>
        </div>
        <div class="flex gap-6">
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('footer.privacy') }}</a>
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('footer.terms') }}</a>
        </div>
      </footer>
    </div>
  </div>
</template>

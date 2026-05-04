<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BackgroundCanvas from './components/BackgroundCanvas.vue'
import TopBar from './components/TopBar.vue'

const { t } = useI18n()
const route = useRoute()

const isDesktopRoute = computed(() => route.path.startsWith('/desktop'))
const brandSuffix = computed(() => (isDesktopRoute.value ? 'Desktop' : ''))
</script>

<template>
  <div class="min-h-screen font-sans overflow-x-hidden">
    <BackgroundCanvas />

    <div class="w-full flex flex-col items-center">
      <TopBar :brand-suffix="brandSuffix" :hide-nav="isDesktopRoute" />

      <RouterView />

      <footer class="w-full max-w-[1080px] py-[60px] relative after:absolute after:top-0 after:left-4 after:right-4 md:after:left-8 md:after:right-8 after:h-px after:bg-border flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8">
        <span class="text-sm text-muted-foreground">{{ t('footer.copyright') }}</span>
        <div class="flex gap-6">
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('footer.privacy') }}</a>
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">{{ t('footer.terms') }}</a>
        </div>
      </footer>
    </div>
  </div>
</template>

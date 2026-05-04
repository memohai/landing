<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { BookOpen, ChevronDown, Download } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '@unhead/vue'

const { locale, t } = useI18n()

useSeoMeta({
  title: () => t('desktop.seo.title'),
  description: () => t('desktop.seo.description'),
  ogTitle: () => t('desktop.seo.title'),
  ogDescription: () => t('desktop.seo.description'),
  ogType: 'website',
  ogUrl: 'https://memoh.ai/desktop',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('desktop.seo.title'),
  twitterDescription: () => t('desktop.seo.description'),
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  link: [
    { rel: 'canonical', href: 'https://memoh.ai/desktop' },
    { rel: 'alternate', hreflang: 'en', href: 'https://memoh.ai/desktop' },
    { rel: 'alternate', hreflang: 'zh', href: 'https://memoh.ai/desktop' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://memoh.ai/desktop' },
  ],
})

const isDownloadOpen = ref(false)
const downloadMenuRef = ref<HTMLElement | null>(null)

onClickOutside(downloadMenuRef, () => {
  isDownloadOpen.value = false
})

const toggleDownload = () => {
  isDownloadOpen.value = !isDownloadOpen.value
}

type DownloadOption = {
  key: 'macArm' | 'macIntel' | 'win' | 'linux'
  icon: string
  href: string
}

const downloadOptions: DownloadOption[] = [
  { key: 'macArm', icon: 'mdi:apple', href: '#' },
  { key: 'macIntel', icon: 'mdi:apple', href: '#' },
  { key: 'win', icon: 'mdi:microsoft-windows', href: '#' },
  { key: 'linux', icon: 'mdi:linux', href: '#' },
]
</script>

<template>
  <section class="w-full max-w-[1080px] px-4 md:px-8 py-[120px] md:py-[160px] flex flex-col items-start gap-6 relative z-10">
    <h1 class="font-bold text-4xl md:text-6xl tracking-tight text-foreground leading-[1.1]">
      {{ t('desktop.title') }}
    </h1>
    <p class="text-base md:text-lg text-muted-foreground max-w-[640px] leading-relaxed">
      {{ t('desktop.subtitle') }}
    </p>

    <div class="flex flex-col sm:flex-row gap-3 mt-6">
      <div class="relative" ref="downloadMenuRef">
        <button
          @click="toggleDownload"
          type="button"
          class="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-5 h-11 font-medium flex items-center gap-2 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none"
          :aria-expanded="isDownloadOpen"
          aria-haspopup="menu"
        >
          <Download class="w-4 h-4 shrink-0" />
          <span class="whitespace-nowrap">{{ t('desktop.download') }}</span>
          <ChevronDown
            class="w-4 h-4 shrink-0 opacity-80 transition-transform duration-200"
            :class="{ 'rotate-180': isDownloadOpen }"
          />
        </button>

        <Transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-if="isDownloadOpen"
            role="menu"
            class="absolute top-full left-0 mt-2 w-72 rounded-md border border-border bg-background shadow-lg z-50 overflow-hidden py-1 origin-top-left"
          >
            <a
              v-for="opt in downloadOptions"
              :key="opt.key"
              :href="opt.href"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              class="group flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
              @click="isDownloadOpen = false"
            >
              <Icon :icon="opt.icon" class="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
              <span class="font-medium">{{ t(`desktop.os.${opt.key}`) }}</span>
            </a>
          </div>
        </Transition>
      </div>

      <a
        href="https://docs.memoh.ai"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary/10 rounded-md px-5 h-11 font-medium active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <BookOpen class="w-4 h-4 shrink-0" />
        <span class="whitespace-nowrap">{{ t('desktop.docs') }}</span>
      </a>
    </div>

    <!-- TODO: 后续完善 -->
  </section>
</template>

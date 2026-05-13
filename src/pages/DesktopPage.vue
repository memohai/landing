<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { BookOpen, ChevronDown } from 'lucide-vue-next'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '@unhead/vue'
import {
  desktopDownloadOptions,
  getDesktopDownloadHref,
  type DesktopDownloadKey,
} from '../lib/desktopDownloads'
import {
  getInitialDesktopDownloadKey,
  resolvePreferredDesktopDownloadKey,
} from '../lib/desktopDevice'
import { fetchDesktopReleaseInfo, type DesktopReleaseInfo } from '../lib/desktopRelease'

const { locale, t } = useI18n()
const desktopUrl = 'https://memoh.ai/desktop'
const socialImage = 'https://memoh.ai/logo.png'

useSeoMeta({
  title: () => t('desktop.seo.title'),
  description: () => t('desktop.seo.description'),
  ogTitle: () => t('desktop.seo.title'),
  ogDescription: () => t('desktop.seo.description'),
  ogType: 'website',
  ogUrl: desktopUrl,
  ogImage: socialImage,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('desktop.seo.title'),
  twitterDescription: () => t('desktop.seo.description'),
  twitterImage: socialImage,
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  link: [
    { rel: 'canonical', href: desktopUrl },
    { rel: 'alternate', hreflang: 'en', href: desktopUrl },
    { rel: 'alternate', hreflang: 'zh', href: desktopUrl },
    { rel: 'alternate', hreflang: 'x-default', href: desktopUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Memoh Desktop',
        operatingSystem: 'macOS, Windows, Linux',
        applicationCategory: 'DeveloperApplication',
        downloadUrl: desktopUrl,
        description: t('desktop.seo.description'),
        author: {
          '@type': 'Organization',
          name: 'MemohAI',
        },
      })),
    },
  ],
})

const isDownloadOpen = ref(false)
const downloadMenuRef = ref<HTMLElement | null>(null)
const preferredDownloadKey = ref<DesktopDownloadKey | undefined>(getInitialDesktopDownloadKey())
const releaseInfo = ref<DesktopReleaseInfo | undefined>()
const isReleaseInfoLoading = ref(false)

onClickOutside(downloadMenuRef, () => {
  isDownloadOpen.value = false
})

const toggleDownload = () => {
  isDownloadOpen.value = !isDownloadOpen.value
}

const updatePreferredDownload = async () => {
  preferredDownloadKey.value = await resolvePreferredDesktopDownloadKey() || preferredDownloadKey.value
}

const updateReleaseInfo = async () => {
  isReleaseInfoLoading.value = true
  try {
    releaseInfo.value = await fetchDesktopReleaseInfo()
  } finally {
    isReleaseInfoLoading.value = false
  }
}

onMounted(() => {
  void updatePreferredDownload()
  void updateReleaseInfo()
})

const downloadTag = computed(() => releaseInfo.value?.tag)
const downloadOptions = computed(() => {
  return desktopDownloadOptions.map((opt) => ({
    ...opt,
    href: getDesktopDownloadHref(opt.key, downloadTag.value),
  }))
})
const preferredDownload = computed(() => {
  return downloadOptions.value.find((opt) => opt.key === preferredDownloadKey.value)
})
const preferredDownloadHref = computed(() => getDesktopDownloadHref(preferredDownloadKey.value, downloadTag.value))
const preferredDownloadIcon = computed(() => preferredDownload.value?.icon || 'mdi:desktop-classic')
const releasePublishedDate = computed(() => {
  if (!releaseInfo.value?.publishedAt) return ''

  const date = new Date(releaseInfo.value.publishedAt)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
})

const releaseStatusLabel = computed(() => {
  if (!releaseInfo.value) return ''
  return releaseInfo.value.prerelease ? t('desktop.version.prerelease') : t('desktop.version.stable')
})

const sortedDownloadOptions = computed(() => {
  const preferred = preferredDownload.value
  if (!preferred) return downloadOptions.value

  return [
    preferred,
    ...downloadOptions.value.filter((opt) => opt.key !== preferred.key),
  ]
})

const handlePrimaryDownload = (event: MouseEvent) => {
  if (preferredDownloadHref.value) {
    isDownloadOpen.value = false
    return
  }

  event.preventDefault()
  toggleDownload()
}
</script>

<template>
  <section class="w-full max-w-[1080px] px-4 md:px-8 py-[120px] md:py-[160px] flex flex-col items-start gap-6 relative z-10">
    <h1 class="font-bold text-4xl md:text-6xl tracking-tight text-foreground leading-[1.1]">
      {{ t('desktop.title') }}
    </h1>
    <p class="text-base md:text-lg text-muted-foreground max-w-[640px] leading-relaxed">
      {{ t('desktop.subtitle') }}
    </p>

    <div
      v-if="releaseInfo || isReleaseInfoLoading"
      class="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-[14px] border border-border bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-none backdrop-blur-sm"
    >
      <span class="inline-flex items-center gap-2 font-mono text-[15px] font-medium text-primary">
        <Icon icon="mdi:tag-outline" class="h-4 w-4 shrink-0" />
        {{ releaseInfo?.tag || t('desktop.version.loading') }}
      </span>
      <span
        v-if="releaseInfo"
        class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium"
        :class="releaseInfo.prerelease
          ? 'border-primary/20 bg-primary/10 text-primary'
          : 'border-border bg-muted text-muted-foreground'"
      >
        {{ releaseStatusLabel }}
      </span>
      <span v-if="releasePublishedDate" class="text-xs text-muted-foreground">
        {{ t('desktop.version.published', { date: releasePublishedDate }) }}
      </span>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mt-6">
      <div class="relative" ref="downloadMenuRef">
        <div
          class="inline-flex h-11 overflow-hidden rounded-md bg-primary text-primary-foreground shadow-none transition-all hover:bg-primary/90 active:scale-95 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          :class="{ 'ring-2 ring-primary/20': isDownloadOpen }"
        >
          <a
            :href="preferredDownloadHref || undefined"
            :target="preferredDownloadHref ? '_blank' : undefined"
            :rel="preferredDownloadHref ? 'noopener noreferrer' : undefined"
            :aria-disabled="!preferredDownloadHref"
            @click="handlePrimaryDownload"
            class="flex h-full items-center gap-2 bg-transparent px-5 font-medium transition-colors focus-visible:outline-none"
          >
            <Icon :icon="preferredDownloadIcon" class="w-5 h-5 shrink-0" />
            <span class="whitespace-nowrap">{{ t('desktop.download') }}</span>
            <span
              v-if="preferredDownload"
              class="inline max-w-[160px] truncate border-l border-primary-foreground/30 pl-2 text-xs text-primary-foreground/80 sm:max-w-[180px]"
            >
              {{ t(`desktop.os.${preferredDownload.key}`) }}
            </span>
          </a>
          <button
            @click="toggleDownload"
            type="button"
            class="flex h-full items-center border-l border-primary-foreground/25 bg-transparent px-3 font-medium transition-colors hover:bg-transparent focus-visible:outline-none"
            :aria-expanded="isDownloadOpen"
            :aria-label="t('desktop.moreDownloads')"
            aria-haspopup="menu"
          >
            <ChevronDown
              class="w-4 h-4 shrink-0 opacity-80 transition-transform duration-200"
              :class="{ 'rotate-180': isDownloadOpen }"
            />
          </button>
        </div>

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
              v-for="opt in sortedDownloadOptions"
              :key="opt.key"
              :href="opt.href || undefined"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              :aria-disabled="!opt.href"
              class="group flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
              :class="{ 'pointer-events-none opacity-50': !opt.href }"
              @click="isDownloadOpen = false"
            >
              <Icon :icon="opt.icon" class="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
              <span class="font-medium">{{ t(`desktop.os.${opt.key}`) }}</span>
              <span v-if="opt.key === preferredDownloadKey" class="ml-auto text-xs font-medium text-primary">
                {{ t('desktop.recommended') }}
              </span>
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
const pageUrl = 'https://memoh.ai/download'
const socialImage = 'https://memoh.ai/logo.png'

useSeoMeta({
  title: () => t('download.seo.title'),
  description: () => t('download.seo.description'),
  ogTitle: () => t('download.seo.title'),
  ogDescription: () => t('download.seo.description'),
  ogType: 'website',
  ogUrl: pageUrl,
  ogImage: socialImage,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('download.seo.title'),
  twitterDescription: () => t('download.seo.description'),
  twitterImage: socialImage,
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  link: [
    { rel: 'canonical', href: pageUrl },
    { rel: 'alternate', hreflang: 'en', href: pageUrl },
    { rel: 'alternate', hreflang: 'zh', href: pageUrl },
    { rel: 'alternate', hreflang: 'x-default', href: pageUrl },
  ],
})

const preferredDownloadKey = ref<DesktopDownloadKey | undefined>(getInitialDesktopDownloadKey())
const releaseInfo = ref<DesktopReleaseInfo | undefined>()
const isReleaseInfoLoading = ref(false)

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

const familyOf = (key: DesktopDownloadKey): 'mac' | 'win' | 'linux' => {
  if (key.startsWith('mac')) return 'mac'
  if (key === 'win') return 'win'
  return 'linux'
}

const groupMeta = [
  // Per-icon sizing: the Windows 11 squares fill their whole box, so they read
  // larger than the padded apple/penguin glyphs — trim them to optically match.
  { id: 'mac', icon: 'simple-icons:apple', iconClass: 'w-5 h-5' },
  // Windows 11 mark — the upright 2x2 squares, not the old tilted perspective flag
  { id: 'win', icon: 'simple-icons:windows11', iconClass: 'w-[14px] h-[14px]' },
  // Real Tux penguin, the actual Linux mascot
  { id: 'linux', icon: 'simple-icons:linux', iconClass: 'w-[18px] h-[18px]' },
] as const

const groups = computed(() =>
  groupMeta.map((meta) => ({
    ...meta,
    name: t(`download.groups.${meta.id}`),
    items: desktopDownloadOptions
      .filter((opt) => familyOf(opt.key) === meta.id)
      .map((opt) => ({
        key: opt.key,
        icon: opt.icon,
        label: t(`desktop.os.${opt.key}`),
        href: getDesktopDownloadHref(opt.key, downloadTag.value),
      })),
  })),
)

const preferredFamily = computed(() => {
  const key = preferredDownloadKey.value
  return key ? familyOf(key) : undefined
})
const preferredFamilyName = computed(() => {
  const fam = preferredFamily.value
  if (!fam) return undefined
  return fam === 'mac' ? 'macOS' : fam === 'win' ? 'Windows' : 'Linux'
})
const preferredDownloadHref = computed(() => getDesktopDownloadHref(preferredDownloadKey.value, downloadTag.value))
</script>

<template>
  <section class="w-full max-w-[1080px] mx-auto px-4 md:px-8 pt-[140px] md:pt-[200px] pb-[160px] min-h-[calc(100vh-3.5rem)] flex flex-col items-start gap-12 md:gap-14 relative z-10">
    <header class="flex flex-col items-start gap-2">
      <h1 class="font-bold text-4xl md:text-5xl tracking-tight text-foreground leading-[1.1]">
        {{ t('download.title') }}
      </h1>
      <p class="text-base md:text-lg text-muted-foreground max-w-[640px] leading-relaxed">
        {{ t('download.subtitle') }}
      </p>
    </header>

    <!-- Auto-detected recommended download -->
    <div
      v-if="preferredDownloadHref"
      class="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-3"
    >
      <a
        :href="preferredDownloadHref"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-pill btn-pill-primary inline-flex h-12 items-center justify-center gap-2 px-6 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span class="whitespace-nowrap">{{ t('desktop.downloadFor', { os: preferredFamilyName }) }}</span>
        <Icon icon="mdi:tray-arrow-down" class="w-[18px] h-[18px] shrink-0" />
      </a>
    </div>

    <!-- Full platform grid -->
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="group in groups"
        :key="group.id"
        class="rounded-2xl border border-border bg-background overflow-hidden"
      >
        <div class="flex items-center gap-2 px-5 pt-5 pb-3">
          <Icon :icon="group.icon" :class="[group.iconClass, 'shrink-0 text-foreground']" />
          <h2 class="font-semibold text-foreground">{{ group.name }}</h2>
        </div>
        <div class="px-2 pb-2 flex flex-col">
          <a
            v-for="item in group.items"
            :key="item.key"
            :href="item.href || undefined"
            target="_blank"
            rel="noopener noreferrer"
            :aria-disabled="!item.href"
            class="group/item flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-foreground transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            :class="{ 'pointer-events-none opacity-50': !item.href }"
          >
            <span class="flex-1 min-w-0 truncate font-medium">{{ item.label }}</span>
            <Icon
              icon="mdi:tray-arrow-down"
              class="w-4 h-4 shrink-0 text-muted-foreground transition-colors group-hover/item:text-foreground"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

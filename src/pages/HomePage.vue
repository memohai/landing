<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, ImageIcon } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '@unhead/vue'
import HeroSection from '../components/HeroSection.vue'

const { locale, t } = useI18n()
const siteUrl = 'https://memoh.ai/'
const socialImage = 'https://memoh.ai/logo.png'

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage: socialImage,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
  twitterImage: socialImage,
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'alternate', hreflang: 'en', href: siteUrl },
    { rel: 'alternate', hreflang: 'zh', href: siteUrl },
    { rel: 'alternate', hreflang: 'x-default', href: siteUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'MemohAI',
        'operatingSystem': 'Linux, macOS, Windows',
        'applicationCategory': 'BusinessApplication',
        'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
        'description': t('seo.description'),
        'author': { '@type': 'Organization', 'name': 'MemohAI' },
      })),
    },
  ],
})

const s1Proofs = [
  { key: 'desktop', hint: 'Agent 的桌面环境截图\nVNC / noVNC 远程桌面画面' },
  { key: 'files', hint: 'Agent 的文件管理器截图\n文件列表 / 工作区目录结构' },
  { key: 'network', hint: 'Agent 独立上网的证据\n浏览器自动操作 / 网页抓取画面' },
]

const s2Proofs = [
  { key: 'cron', hint: '定时任务面板截图\n任务列表 / 执行记录' },
  { key: 'proactive', hint: 'Agent 主动发消息的截图\nTelegram / 微信收到 Agent 通知' },
  { key: 'memory', hint: '跨会话记忆的证据\n上下文延续 / 记忆面板' },
]

const s3Channels = [
  { name: 'Desktop', hint: 'Memoh Desktop 客户端截图' },
  { name: 'Telegram', hint: 'Telegram 对话截图' },
  { name: 'WeChat', hint: '微信对话截图' },
  { name: 'Web', hint: 'Web UI 聊天截图' },
]
</script>

<template>
  <!-- ═══ HERO ═══ -->
  <HeroSection />

  <!-- ═══ SCREEN 1 — 一台属于 Ta 的电脑 (图片大卡片 · railway) ═══ -->
  <section class="w-full px-4 md:px-6 pt-[40px] md:pt-[52px] pb-[8px] md:pb-[10px]">
    <div class="w-full relative rounded-3xl overflow-hidden border border-white/10">
      <img src="/art-railway.png" alt="" class="absolute inset-0 w-full h-full object-cover object-[35%_100%]" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 via-55% to-transparent" />
      <div class="relative z-10 flex justify-center px-6 md:px-12 pt-10 md:pt-14 pb-0">
        <div class="w-full max-w-[1080px] flex flex-col gap-10 md:gap-12">
          <div class="flex flex-col gap-3 max-w-[600px]">
            <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-white">
              {{ $t('s1.title') }}
            </h2>
            <p class="text-base md:text-lg text-white/80 leading-snug whitespace-pre-line">
              {{ $t('s1.subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div v-for="(proof, i) in s1Proofs" :key="proof.key" class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-4 md:p-5">
              <div class="flex flex-col gap-0.5 px-1">
                <h3 class="font-medium text-base text-white">{{ $t(`s1.c${i+1}.title`) }}</h3>
                <p class="text-sm text-white/65 leading-snug whitespace-pre-line">{{ $t(`s1.c${i+1}.desc`) }}</p>
              </div>
              <div class="rounded-xl border border-white/10 bg-black/40 aspect-[4/5] flex flex-col items-center justify-center gap-2">
                <ImageIcon :size="24" class="text-white/20" />
                <span class="text-white/30 text-xs text-center px-4 whitespace-pre-line">{{ proof.hint }}</span>
              </div>
            </div>
          </div>

          <!-- 留白让图片下部的列车露出 -->
          <div class="h-[120px] md:h-[170px]" />
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ SCREEN 2 — 你不在的时候 Ta 也在 (图片大卡片 · station) ═══ -->
  <section class="w-full px-4 md:px-6 py-[8px] md:py-[10px]">
    <div class="w-full relative rounded-3xl overflow-hidden border border-white/10">
      <img src="/art-station.png" alt="" class="absolute inset-0 w-full h-full object-cover scale-[1.3] origin-[57%_90%]" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 via-55% to-transparent" />
      <div class="relative z-10 flex justify-center px-6 md:px-12 pt-10 md:pt-14 pb-0">
        <div class="w-full max-w-[1080px] flex flex-col gap-10 md:gap-12">
          <div class="flex flex-col gap-3 max-w-[600px]">
            <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-white">
              {{ $t('s2.title') }}
            </h2>
            <p class="text-base md:text-lg text-white/80 leading-snug whitespace-pre-line">
              {{ $t('s2.subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div v-for="(proof, i) in s2Proofs" :key="proof.key" class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-4 md:p-5">
              <div class="flex flex-col gap-0.5 px-1">
                <h3 class="font-medium text-base text-white">{{ $t(`s2.c${i+1}.title`) }}</h3>
                <p class="text-sm text-white/65 leading-snug whitespace-pre-line">{{ $t(`s2.c${i+1}.desc`) }}</p>
              </div>
              <div class="rounded-xl border border-white/10 bg-black/40 aspect-[4/5] flex flex-col items-center justify-center gap-2">
                <ImageIcon :size="24" class="text-white/20" />
                <span class="text-white/30 text-xs text-center px-4 whitespace-pre-line">{{ proof.hint }}</span>
              </div>
            </div>
          </div>

          <!-- 留白让图片下部的站台露出 -->
          <div class="h-[120px] md:h-[170px]" />
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ SCREEN 3 — 在哪都能找到 Ta (图片大卡片 · cafe) ═══ -->
  <section class="w-full px-4 md:px-6 py-[8px] md:py-[10px]">
    <div class="w-full relative rounded-3xl overflow-hidden border border-white/10">
      <img src="/art-cafe.png" alt="" class="absolute inset-0 w-full h-full object-cover object-bottom scale-[1.25] origin-bottom" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 via-55% to-transparent" />
      <div class="relative z-10 flex justify-center px-6 md:px-12 pt-10 md:pt-14 pb-0">
        <div class="w-full max-w-[1080px] flex flex-col gap-10 md:gap-12">
          <div class="flex flex-col gap-3 max-w-[600px]">
            <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-white">
              {{ $t('s3.title') }}
            </h2>
            <p class="text-base md:text-lg text-white/80 leading-snug whitespace-pre-line">
              {{ $t('s3.subtitle') }}
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div v-for="ch in s3Channels" :key="ch.name" class="flex flex-col gap-0 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
              <div class="aspect-[3/4] bg-white/[0.04] flex flex-col items-center justify-center gap-2">
                <ImageIcon :size="20" class="text-white/20" />
                <span class="text-white/30 text-[10px] text-center px-2">{{ ch.hint }}</span>
              </div>
              <div class="px-3 py-2.5 border-t border-white/10">
                <span class="text-xs font-medium text-white">{{ ch.name }}</span>
              </div>
            </div>
          </div>

          <!-- 留白让图片下部的小猫露出 -->
          <div class="h-[120px] md:h-[170px]" />
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ BOTTOM CTA ═══ -->
  <section class="w-full flex items-center justify-center min-h-[60vh] pt-[120px] pb-[140px] px-4 md:px-8">
    <div class="w-full max-w-[1080px] flex flex-col items-center text-center gap-8">
      <h2 class="font-semibold text-3xl md:text-4xl tracking-tight text-foreground">
        {{ $t('cta_bottom.title') }}
      </h2>
      <div class="flex flex-col sm:flex-row items-center gap-4">
        <router-link
          to="/desktop"
          class="cta-btn-primary inline-flex items-center justify-center gap-2 h-[48px] px-8 rounded-full font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {{ $t('cta_bottom.btn') }}
          <ArrowRight :size="16" />
        </router-link>
        <a
          href="https://docs.memoh.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-btn-secondary inline-flex items-center justify-center h-[48px] px-8 rounded-full font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {{ $t('cta_bottom.docs') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-btn-primary {
  position: relative;
  color: var(--background);
  isolation: isolate;
}
.cta-btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: var(--foreground);
  transition: scale 0.3s linear(0, .3505, .7432, .9336, .9951, 1.0062, 1.0045, 1.0019, 1.0005, 1);
}
.cta-btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.08);
  opacity: 0;
  transition: opacity 0.18s ease-out;
}
.cta-btn-primary:hover::before {
  scale: 1.005 1.015;
}
.cta-btn-primary:hover::after {
  opacity: 1;
}
.cta-btn-primary:active::after {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.12);
}

.cta-btn-secondary {
  position: relative;
  color: var(--foreground);
  isolation: isolate;
}
.cta-btn-secondary::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  border: 1px solid oklch(1 0 0 / 0.15);
  background-color: transparent;
  transition: scale 0.3s linear(0, .3505, .7432, .9336, .9951, 1.0062, 1.0045, 1.0019, 1.0005, 1),
              background-color 0.18s ease-out;
}
.cta-btn-secondary:hover::before {
  scale: 1.005 1.015;
  background-color: oklch(1 0 0 / 0.06);
}
.cta-btn-secondary:active::before {
  scale: 0.98;
}
</style>

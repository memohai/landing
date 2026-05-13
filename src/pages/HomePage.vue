<script setup lang="ts">
import { computed } from 'vue'
import { Store, Code2, Smartphone } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import { useHead, useSeoMeta } from '@unhead/vue'
import HeroSection from '../components/HeroSection.vue'
import InstallModule from '../components/InstallModule.vue'
import UseCasesGrid from '../components/UseCasesGrid.vue'
import FeatureGallery from '../components/FeatureGallery.vue'
import heroImage from '../assets/hero.png'

const { locale, t } = useI18n()

useSeoMeta({
  title: () => t('seo.title'),
  description: () => t('seo.description'),
  ogTitle: () => t('seo.title'),
  ogDescription: () => t('seo.description'),
  ogType: 'website',
  ogUrl: 'https://memoh.ai',
  ogImage: heroImage,
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('seo.title'),
  twitterDescription: () => t('seo.description'),
})

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  link: [
    {
      rel: 'canonical',
      href: 'https://memoh.ai',
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: 'https://memoh.ai/',
    },
    {
      rel: 'alternate',
      hreflang: 'zh',
      href: 'https://memoh.ai/',
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: 'https://memoh.ai/',
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
</script>

<template>
  <HeroSection />

  <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

  <InstallModule />

  <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

  <UseCasesGrid />

  <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

  <FeatureGallery />

  <div class="w-full max-w-[1080px] px-4 md:px-8 relative"><div class="absolute bottom-0 left-4 right-4 md:left-8 md:right-8 h-px bg-border"></div></div>

  <section class="max-w-[800px] w-full py-[80px] flex flex-col gap-8 px-4 md:px-8">
    <h2 class="font-semibold text-xl md:text-2xl tracking-tight text-foreground">
      {{ $t('ecosystem.title') }}
    </h2>
    <div class="flex flex-col border border-border rounded-md bg-background overflow-hidden shadow-none">
      <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-border hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:bg-primary/5 group">
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center text-foreground shrink-0 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
            <Store :size="16" :stroke-width="2" />
          </div>
          <span class="font-medium text-sm text-foreground">{{ $t('ecosystem.e1.title') }}</span>
        </div>
        <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">{{ $t('ecosystem.e1.desc') }}</span>
      </a>
      <a href="https://github.com/memohai/twilight-ai" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-border hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:bg-primary/5 group">
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center text-foreground shrink-0 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
            <Code2 :size="16" :stroke-width="2" />
          </div>
          <span class="font-medium text-sm text-foreground">{{ $t('ecosystem.e2.title') }}</span>
        </div>
        <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">{{ $t('ecosystem.e2.desc') }}</span>
      </a>
      <a href="https://github.com/memohai/Autofish" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:bg-primary/5 group">
        <div class="flex items-center gap-4">
          <div class="w-8 h-8 rounded border border-border bg-muted flex items-center justify-center text-foreground shrink-0 transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
            <Smartphone :size="16" :stroke-width="2" />
          </div>
          <span class="font-medium text-sm text-foreground">{{ $t('ecosystem.e3.title') }}</span>
        </div>
        <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">{{ $t('ecosystem.e3.desc') }}</span>
      </a>
    </div>
  </section>

  <section class="max-w-[1080px] w-full pt-[40px] pb-[80px] flex flex-col items-center px-4 md:px-8 relative z-10">
    <div class="relative w-full p-8 md:p-10 rounded-2xl border border-border bg-background shadow-none hover:shadow-md hover:-translate-y-1 flex flex-col items-center text-center gap-6 overflow-hidden group transition-all duration-300">
      <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-30 group-hover:opacity-60 transition-opacity duration-700">
        <svg viewBox="0 0 1080 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-border"><path d="M-100 100 Q 400 50 600 100 T 1200 100" stroke="currentColor" stroke-width="1" fill="none" /></svg>
      </div>
      <h2 class="relative z-10 font-bold text-2xl md:text-3xl tracking-tight text-foreground">
        {{ $t('cta_bottom.title') }}
      </h2>
      <div class="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <div class="flex items-center px-4 py-3 rounded-md border border-border bg-muted/30 font-mono text-sm text-foreground overflow-x-auto no-scrollbar w-full sm:w-auto">
          curl -sL https://memoh.sh | bash
        </div>
        <a href="https://docs.memoh.ai" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 px-6 py-3 rounded-md font-medium shadow-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 w-full sm:w-auto whitespace-nowrap">
          {{ $t('cta_bottom.btn') }}
        </a>
      </div>
    </div>
  </section>
</template>

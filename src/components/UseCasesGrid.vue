<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Users, Brain, Wrench, LayoutDashboard, X,
  Box, MessageSquare, Globe, Theater, MessagesSquare, Clock, ShieldCheck, FlaskConical, Rocket
} from 'lucide-vue-next'

const { t, locale } = useI18n()

const isModalOpen = ref(false)

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const openModal = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

// Full feature data for the modal
const allSections = computed(() => [
  {
    id: 'core',
    title: t('usecases.sections.core'),
    icon: Box,
    items: [
      { key: 'f1', icon: Users },
      { key: 'f2', icon: Box },
      { key: 'f3', icon: Brain },
      { key: 'f4', icon: MessageSquare }
    ]
  },
  {
    id: 'agent',
    title: t('usecases.sections.agent'),
    icon: Brain,
    items: [
      { key: 'f5', icon: Wrench },
      { key: 'f6', icon: Globe },
      { key: 'f7', icon: Theater },
      { key: 'f8', icon: MessagesSquare },
      { key: 'f9', icon: Clock }
    ]
  },
  {
    id: 'mgmt',
    title: t('usecases.sections.mgmt'),
    icon: LayoutDashboard,
    items: [
      { key: 'f10', icon: LayoutDashboard },
      { key: 'f11', icon: ShieldCheck },
      { key: 'f12', icon: FlaskConical },
      { key: 'f13', icon: Rocket }
    ]
  }
])
</script>

<template>
  <section class="max-w-[1080px] w-full py-[80px] flex flex-col items-center gap-12 px-4 md:px-8 relative">
    <div class="flex flex-col items-center text-center gap-4">
      <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-foreground">
        {{ t('usecases.title') }}
      </h2>
      <p class="text-sm md:text-base text-muted-foreground max-w-[600px]">
        {{ t('usecases.subtitle') }}
      </p>
    </div>

    <!-- Asymmetric Bento Grid -->
    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px]">
      
      <!-- 1. Hero Card: Omnichannel Native (2x2) -->
      <div class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-8 md:p-10 transition-all duration-300 shadow-none hover:border-foreground/20 md:col-span-2 md:row-span-2 min-h-[300px] md:min-h-0" tabindex="0">
        
        <!-- Abstract Topo Art (Low-key SVG) -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500">
          <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover text-border group-hover:text-primary/20 transition-colors duration-500">
            <!-- Center Node (Memoh) -->
            <circle cx="300" cy="200" r="40" stroke="currentColor" stroke-width="1" fill="var(--color-background)" />
            <circle cx="300" cy="200" r="10" fill="currentColor" />
            <!-- Connections & Endpoints -->
            <path d="M300 160 Q300 80 150 80" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" />
            <rect x="130" y="60" width="40" height="40" rx="8" stroke="currentColor" stroke-width="1" />
            
            <path d="M340 200 Q450 200 450 100" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" />
            <circle cx="450" cy="80" r="20" stroke="currentColor" stroke-width="1" />
            
            <path d="M300 240 Q300 320 200 320" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" />
            <rect x="140" y="300" width="60" height="40" rx="4" stroke="currentColor" stroke-width="1" />
            
            <path d="M340 200 Q480 200 480 300" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4" />
            <circle cx="480" cy="320" r="20" stroke="currentColor" stroke-width="1" />
          </svg>
        </div>

        <div class="relative z-10 flex flex-col gap-6 h-full justify-between">
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5">
            <Users :size="24" stroke-width="1.5" />
          </div>
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-3">
              <h3 class="font-semibold text-xl md:text-2xl text-foreground tracking-tight">{{ t('usecases.items.f4.title') }}</h3>
              <p class="text-base text-muted-foreground leading-relaxed max-w-[400px]">{{ t('usecases.items.f4.desc') }}</p>
            </div>
            
            <!-- Omnichannel Logo Marquee -->
            <div class="flex overflow-hidden relative w-full h-8 max-w-[400px] [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
              <div class="flex animate-[marquee_20s_linear_infinite] flex-nowrap items-center w-max hover:[animation-play-state:paused]">
                <!-- Set 1 -->
                <div class="flex gap-6 pr-6 items-center shrink-0">
                  <img src="/brands/telegram.svg" alt="Telegram" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/discord.svg" alt="Discord" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/wechat.svg" alt="WeChat" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/qq.svg" alt="QQ" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/matrix.svg" alt="Matrix" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 dark:invert" />
                  <img src="/brands/slack.svg" alt="Slack" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/gmail.svg" alt="Email" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                </div>
                <!-- Set 2 (Duplicate for continuous loop) -->
                <div class="flex gap-6 pr-6 items-center shrink-0">
                  <img src="/brands/telegram.svg" alt="Telegram" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/discord.svg" alt="Discord" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/wechat.svg" alt="WeChat" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/qq.svg" alt="QQ" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/matrix.svg" alt="Matrix" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300 dark:invert" />
                  <img src="/brands/slack.svg" alt="Slack" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                  <img src="/brands/gmail.svg" alt="Email" class="w-7 h-7 shrink-0 object-contain grayscale-0 opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300" />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <!-- 2. Tall Card: Memory Engineering (1x2) -->
      <div class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-6 md:p-8 transition-all duration-300 shadow-none hover:border-foreground/20 md:col-span-1 md:row-span-2 min-h-[300px] md:min-h-0" tabindex="0">
        
        <!-- Abstract Stack Art (Low-key SVG) -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden flex items-end justify-center pb-10 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
          <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[80%] h-auto text-border group-hover:text-primary/20 transition-colors duration-500">
            <path d="M20 220 L100 260 L180 220 L100 180 Z" stroke="currentColor" stroke-width="1" fill="var(--color-background)" />
            <path d="M20 180 L100 220 L180 180 L100 140 Z" stroke="currentColor" stroke-width="1" fill="var(--color-background)" />
            <path d="M20 140 L100 180 L180 140 L100 100 Z" stroke="currentColor" stroke-width="1" fill="var(--color-background)" />
            <!-- Floating Data Points -->
            <circle cx="100" cy="80" r="3" fill="currentColor" class="animate-float" />
            <circle cx="80" cy="110" r="2" fill="currentColor" class="animate-float-delayed-1" />
            <circle cx="120" cy="60" r="2" fill="currentColor" class="animate-float-delayed-2" />
          </svg>
        </div>

        <div class="relative z-10 flex flex-col gap-4 h-full">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5">
            <Brain :size="20" stroke-width="1.5" />
          </div>
          <div class="flex flex-col gap-2 mt-auto">
            <h3 class="font-semibold text-lg text-foreground tracking-tight">{{ t('usecases.items.f3.title') }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ t('usecases.items.f3.desc') }}</p>
          </div>
        </div>
      </div>

      <!-- 3. Square Card: Web UI (1x1) -->
      <div class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 shadow-none hover:border-foreground/20 md:col-span-1 md:row-span-1 min-h-[200px] md:min-h-0" tabindex="0">
        <div class="relative z-10 flex flex-col gap-4 h-full">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5">
            <LayoutDashboard :size="20" stroke-width="1.5" />
          </div>
          <div class="flex flex-col gap-1.5 mt-auto">
            <h3 class="font-semibold text-base text-foreground tracking-tight">{{ t('usecases.items.f10.title') }}</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ t('usecases.items.f10.desc') }}</p>
          </div>
        </div>
      </div>

      <!-- 4. Square Card: Containerized (1x1) -->
      <div class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 shadow-none hover:border-foreground/20 md:col-span-1 md:row-span-1 min-h-[200px] md:min-h-0" tabindex="0">
        <div class="relative z-10 flex flex-col gap-4 h-full">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5">
             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <div class="flex flex-col gap-1.5 mt-auto">
            <h3 class="font-semibold text-base text-foreground tracking-tight">{{ t('usecases.items.f2.title') }}</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ t('usecases.items.f2.desc') }}</p>
          </div>
        </div>
      </div>

      <!-- 5. Square Card: MCP (1x1) -->
      <div class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 shadow-none hover:border-foreground/20 md:col-span-1 md:row-span-1 min-h-[200px] md:min-h-0" tabindex="0">
        <div class="relative z-10 flex flex-col gap-4 h-full">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5">
            <Wrench :size="20" stroke-width="1.5" />
          </div>
          <div class="flex flex-col gap-1.5 mt-auto">
            <h3 class="font-semibold text-base text-foreground tracking-tight">{{ t('usecases.items.f5.title') }}</h3>
            <p class="text-xs text-muted-foreground leading-relaxed">{{ t('usecases.items.f5.desc') }}</p>
          </div>
        </div>
      </div>

    </div>

    <!-- View All Tech Specs Link -->
    <button @click="openModal" class="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group focus-visible:outline-none focus-visible:underline underline-offset-4 cursor-pointer bg-transparent border-none">
      <span>{{ locale === 'zh' ? '探索全部 13 项核心能力' : 'Explore all 13 platform capabilities' }}</span>
      <span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </button>
  </section>

  <!-- Feature Breakdown Modal -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 md:translate-y-8"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4 md:translate-y-8"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity" @click="closeModal"></div>
        
        <!-- Modal Content (Max-w-4xl, highly centered, shadow-lg per Design-new.md) -->
        <div class="relative w-full max-w-4xl max-h-[85vh] md:max-h-[80vh] flex flex-col bg-background rounded-2xl md:rounded-[32px] border border-border shadow-lg overflow-hidden flex-shrink-0 z-10" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          
          <!-- Sticky Header -->
          <div class="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-background/95 backdrop-blur-md relative after:absolute after:bottom-0 after:left-6 after:right-6 md:after:left-10 md:after:right-10 after:h-px after:bg-border">
            <h2 id="modal-title" class="font-semibold text-lg md:text-xl text-foreground tracking-tight">
              {{ locale === 'zh' ? '全部 13 项核心能力' : 'All 13 capabilities' }}
            </h2>
            <button @click="closeModal" 
                    class="flex items-center justify-center w-9 h-9 shrink-0 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-transparent shadow-none"
                    aria-label="Close specifications">
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Scrollable Body (Continuous Scroll with Sticky Headers) -->
          <div class="flex-1 overflow-y-auto px-6 md:px-10 py-6">
            <div class="flex flex-col gap-12 max-w-3xl mx-auto pb-10">
              
              <div v-for="section in allSections" :key="section.id" class="flex flex-col">
                <!-- Section Sticky Header -->
                <div class="sticky top-[-24px] z-10 bg-background/95 backdrop-blur py-3 mb-4 flex items-center gap-3">
                  <div class="flex items-center justify-center w-8 h-8 rounded-md bg-muted text-foreground border border-border shrink-0 shadow-none">
                    <component :is="section.icon" class="w-4 h-4" />
                  </div>
                  <h3 class="font-semibold text-lg text-foreground tracking-tight">{{ section.title }}</h3>
                </div>
                
                <!-- Section Items (Concise List) -->
                <div class="flex flex-col gap-6 pl-11">
                  <div v-for="item in section.items" :key="item.key" class="flex flex-col gap-1.5">
                    <h4 class="font-medium text-base text-foreground tracking-tight flex items-center gap-2">
                      <component :is="item.icon" class="w-4 h-4 text-muted-foreground shrink-0" />
                      {{ t('usecases.items.' + item.key + '.title') }}
                    </h4>
                    <p class="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap max-w-2xl pl-6">
                      {{ t('usecases.items.' + item.key + '.desc') }}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Standardized transitions for abstract backgrounds */
</style>
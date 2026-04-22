<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { X, Search, Pause, Play } from 'lucide-vue-next'

const { t } = useI18n()

interface Tab {
  id: number
  key: string
  image: string
  descKey: string
}

const tabs: Tab[] = [
  { id: 1, key: 't1', image: 'https://raw.githubusercontent.com/memohai/Memoh/main/assets/gallery/01.png', descKey: 'd1' },
  { id: 2, key: 't2', image: 'https://raw.githubusercontent.com/memohai/Memoh/main/assets/gallery/02.png', descKey: 'd2' },
  { id: 3, key: 't3', image: 'https://raw.githubusercontent.com/memohai/Memoh/main/assets/gallery/03.png', descKey: 'd3' },
  { id: 4, key: 't4', image: 'https://raw.githubusercontent.com/memohai/Memoh/main/assets/gallery/04.png', descKey: 'd4' },
  { id: 5, key: 't5', image: 'https://raw.githubusercontent.com/memohai/Memoh/main/assets/gallery/05.png', descKey: 'd5' },
  { id: 6, key: 't6', image: 'https://raw.githubusercontent.com/memohai/Memoh/main/assets/gallery/06.png', descKey: 'd6' }
]

const activeTab = ref<Tab>(tabs[0])
const lightboxOpen = ref(false)
const imageLoaded = ref<Record<number, boolean>>({})

// Carousel state
const isAutoPlaying = ref(true)
const progress = ref(0)
const SLIDE_DURATION = 5000 // 5 seconds per slide
let animationFrameId = 0
let lastTime = performance.now()

const animate = (time: number) => {
  if (isAutoPlaying.value && !lightboxOpen.value) {
    const delta = time - lastTime
    progress.value += (delta / SLIDE_DURATION) * 100

    if (progress.value >= 100) {
      nextTab()
      progress.value = 0
    }
  }
  lastTime = time
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  lastTime = performance.now()
  animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})

const nextTab = () => {
  const currentIndex = tabs.findIndex(t => t.id === activeTab.value.id)
  const nextIndex = (currentIndex + 1) % tabs.length
  activeTab.value = tabs[nextIndex]
}

const setActiveTab = (tab: Tab, manual = false) => {
  activeTab.value = tab
  if (manual) {
    isAutoPlaying.value = false
    progress.value = 0
  } else {
    progress.value = 0
  }
}

const toggleAutoPlay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  if (isAutoPlaying.value) {
    // Reset timer to avoid immediate jumps if it was paused near 100%
    progress.value = 0 
    lastTime = performance.now()
  }
}

const openLightbox = () => {
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
  lastTime = performance.now() // Prevent progress jump
}
</script>

<template>
  <section class="max-w-[1080px] w-full py-[80px] flex flex-col gap-10 px-4 md:px-8 relative">
    <!-- Header -->
    <div class="flex flex-col items-center text-center gap-4">
      <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-foreground">
        {{ t('gallery.title') }}
      </h2>
      <p class="text-sm md:text-base text-muted-foreground max-w-[600px]">
        {{ t('gallery.subtitle') }}
      </p>
    </div>

    <!-- Gallery Layout: 12-column grid. Left 4 cols (tabs), Right 8 cols (image) on desktop -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 w-full items-stretch">
      
      <!-- Left Tabs Navigation (Scrollable horizontally on mobile, vertical on desktop) -->
      <div class="w-full md:w-1/3 flex flex-col justify-between shrink-0 pb-2">
        <div class="flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar gap-2 md:justify-between flex-1 pb-4 md:pb-0">
          <button 
            v-for="tab in tabs" 
            :key="tab.id" 
            @click="setActiveTab(tab, true)"
            class="relative flex items-center px-4 py-3 md:py-4 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 md:shrink border border-transparent text-sm md:text-[15px] whitespace-nowrap md:whitespace-normal text-left"
            :class="[
              activeTab.id === tab.id 
                ? 'bg-accent/50 font-medium text-foreground' 
                : 'text-muted-foreground hover:bg-accent/30 hover:text-foreground'
            ]"
          >
            <!-- Active Indicator (Figma Style) - Stretched to match padding -->
            <div v-if="activeTab.id === tab.id" class="absolute left-1.5 md:left-2 top-1.5 bottom-1.5 w-[3px] bg-primary rounded-full"></div>
            <span class="pl-3">{{ t('gallery.tabs.' + tab.key) }}</span>
          </button>
        </div>
      </div>

      <!-- Right Content Area -->
      <div class="w-full md:w-2/3 flex flex-col gap-4">
        <Transition
          mode="out-in"
          enter-active-class="transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div :key="activeTab.id" class="flex flex-col gap-4">
            <!-- Image Container (Lightbox Trigger) - Fixed aspect ratio & shadows according to Design-new.md -->
            <div 
              class="group relative rounded-xl border border-border bg-muted/10 overflow-hidden cursor-pointer aspect-video flex items-center justify-center transition-colors duration-300 shadow-none hover:border-foreground/20 p-2"
              @click="openLightbox"
              role="button"
              tabindex="0"
              aria-label="View full size image"
            >
              <!-- Image Skeleton -->
              <div v-show="!imageLoaded[activeTab.id]" class="absolute inset-0 m-2 bg-muted/20 animate-pulse rounded-lg"></div>
              
              <!-- The Image -->
              <img 
                :src="activeTab.image" 
                :alt="t('gallery.tabs.' + activeTab.key)" 
                class="w-full h-full object-contain rounded-lg transition-all duration-500 group-hover:scale-105"
                :class="imageLoaded[activeTab.id] ? 'opacity-100' : 'opacity-0'"
                @load="imageLoaded[activeTab.id] = true"
                loading="lazy"
              />
              
              <!-- Overlay Hint -->
              <div class="absolute inset-0 bg-background/0 group-hover:bg-background/5 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <div class="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-sm border border-border text-foreground">
                  <Search class="w-5 h-5" />
                </div>
              </div>
            </div>

            <!-- Description Text (Fixed minimum height to prevent jumping) -->
            <div class="px-2 min-h-[3.5rem] md:min-h-[4rem] flex items-start">
              <p class="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {{ t('gallery.desc.' + activeTab.descKey) }}
              </p>
            </div>
          </div>
        </Transition>
      </div>

    </div>

    <!-- Global Auto-play Progress Bar (Low-profile, centered below both modules) -->
    <div class="w-full flex items-center justify-center mt-4">
      <div class="flex items-center gap-3 w-full max-w-[300px] opacity-50 hover:opacity-100 transition-opacity duration-300">
        <button @click="toggleAutoPlay" 
                class="flex items-center justify-center shrink-0 text-muted-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                :aria-label="isAutoPlaying ? 'Pause carousel' : 'Play carousel'">
          <Pause v-if="isAutoPlaying" class="w-3.5 h-3.5" />
          <Play v-else class="w-3.5 h-3.5" />
        </button>
        <div class="flex-1 h-[2px] bg-muted/40 rounded-full overflow-hidden">
          <div class="h-full bg-foreground/30 transition-none" :style="{ width: isAutoPlaying ? progress + '%' : '0%' }"></div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="lightboxOpen" 
          class="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4 md:p-8"
          @click.self="closeLightbox"
        >
          <!-- Close Button -->
          <button 
            @click="closeLightbox" 
            class="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border border-border shadow-sm z-10"
            aria-label="Close lightbox"
          >
            <X class="w-5 h-5" />
          </button>

          <!-- Lightbox Image (Bimodal Elevation: Strong shadow for floating layer) -->
          <img 
            :src="activeTab.image" 
            :alt="t('gallery.tabs.' + activeTab.key)" 
            class="max-w-full max-h-full object-contain rounded-xl shadow-lg border border-border scale-95 animate-in zoom-in-95 duration-300"
          />
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* Ensure no scrollbar on the tabs container on mobile while keeping it scrollable */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isSkipped = ref(false)
const showContent = ref(false)
const bubbles = ref<any[]>([])
let animationFrameId = 0
let startTime = 0

// FPS 监控
let frameCount = 0
let lastFpsTime = 0
let isDegraded = false

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skipAnimation()
    return
  }

  initBubbles()
  startTime = performance.now()
  lastFpsTime = startTime
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
})

const initBubbles = (count = window.innerWidth < 768 ? 4 : 20) => {
  bubbles.value = Array.from({ length: count }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2)
    const radius = 300 + Math.random() * 150
    return {
      id: i,
      startX: Math.cos(angle) * radius,
      startY: Math.sin(angle) * radius,
      currentX: Math.cos(angle) * radius,
      currentY: Math.sin(angle) * radius,
      scale: 0,
      opacity: 0,
      delay: Math.random() * 1000 // ms
    }
  })
}

// Easing 函数 (Cubic Ease In Out)
const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const animate = () => {
  if (isSkipped.value) return
  
  const now = performance.now()
  const elapsed = now - startTime

  // FPS 降级逻辑
  frameCount++
  if (now - lastFpsTime >= 1000) {
    const fps = frameCount
    if (fps < 30 && !isDegraded) {
      isDegraded = true
      bubbles.value = bubbles.value.slice(0, Math.ceil(bubbles.value.length / 2))
    }
    frameCount = 0
    lastFpsTime = now
  }

  let allFinished = true

  bubbles.value.forEach(b => {
    const bubbleElapsed = elapsed - b.delay
    if (bubbleElapsed < 0) return // 还没出场
    
    if (bubbleElapsed < 1000) {
      const progress = bubbleElapsed / 1000
      b.scale = easeInOutCubic(progress)
      b.opacity = progress
      allFinished = false
    } 
    else if (bubbleElapsed < 4000) {
      const progress = (bubbleElapsed - 1000) / 3000
      const easeProgress = easeInOutCubic(progress)
      
      b.currentX = b.startX * (1 - easeProgress)
      b.currentY = b.startY * (1 - easeProgress)
      b.scale = 1 - (easeProgress * 0.8) // 缩小到 0.2
      b.opacity = 1 - easeProgress       // 褪为透明
      allFinished = false
    } 
    else {
      b.opacity = 0
    }
  })

  if (allFinished && elapsed > 4000) {
    if (!showContent.value) showContent.value = true
    // 延迟结束以让最终的 UI 平滑定型
    setTimeout(() => {
      isSkipped.value = true
    }, 600)
  } else {
    // 视觉甜点：在气泡即将全部被吸入完成的最后一刻（大约 3.8s ~ 4s 间）顺势浮现文字，效果最连贯
    if (elapsed > 3800 && !showContent.value) {
      showContent.value = true
    }
    animationFrameId = requestAnimationFrame(animate)
  }
}

const skipAnimation = () => {
  isSkipped.value = true
  showContent.value = true
  cancelAnimationFrame(animationFrameId)
}
</script>

<template>
  <!-- Background: bg-background (Token) -->
  <section class="relative w-full h-[calc(100vh-64px)] min-h-[600px] bg-background flex flex-col items-center justify-center overflow-hidden border-b border-border shadow-none">
    
    <!-- Subtlest grid background for modern, clean feel, NO gradients. Uses --color-border -->
    <div class="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-50"></div>

    <!-- 舞台 -->
    <div class="relative z-10 w-full max-w-[1080px] h-full flex flex-col items-center justify-center">
      
      <!-- 统一的居中包裹器，通过负 margin 微调光学中心 (Optical Centering) -->
      <div class="relative flex flex-col items-center justify-center w-full -mt-16">
        
        <!-- Logo 与气泡的锚点容器 -->
        <div class="relative flex items-center justify-center w-full h-[100px]">
          <!-- Memoh Logo 绝对居中 - FLAT ATOM, NO SHADOW -->
          <div class="absolute z-20 flex items-center justify-center w-24 h-24 bg-background rounded-2xl border border-border transition-all duration-1000 shadow-none"
               :class="{'scale-110 ring-2 ring-primary/20': !isSkipped && !showContent, 'scale-100': showContent}">
            <span class="font-extrabold text-3xl text-foreground tracking-tighter">Memoh</span>
          </div>

          <!-- JS Physics Bubbles -->
          <div v-if="!isSkipped" class="absolute inset-0 pointer-events-none">
            <div v-for="b in bubbles" :key="b.id" 
                 class="absolute top-1/2 left-1/2 will-change-transform -ml-[75px] -mt-[24px]"
                 :style="{
                   transform: `translate(${b.currentX}px, ${b.currentY}px) scale(${b.scale})`,
                   opacity: b.opacity
                 }">
              <!-- Semantic shadcn/ui-like bubble - BIMODAL ELEVATION: floating items get shadow-lg -->
              <div class="flex items-center gap-3 p-3 rounded-[10px] bg-background border border-border shadow-lg w-[150px]">
                <!-- PURPLE SCARCITY: Icon uses muted foreground instead of indigo -->
                <div class="w-6 h-6 rounded-md bg-muted text-muted-foreground shrink-0 flex items-center justify-center">
                   <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                </div>
                <div class="flex flex-col gap-1.5 w-full">
                  <div class="w-12 h-2 bg-muted rounded-full"></div>
                  <div class="w-20 h-2 bg-muted/60 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- REMOVED STATIC FALLBACK HERE -->
        </div>

        <!-- Typography 紧跟在 Logo 下方 -->
        <div class="flex flex-col items-center gap-6 transition-all duration-700 ease-out text-center px-4 w-full max-w-[800px] mt-8"
             :class="showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
          <h1 class="font-bold text-4xl md:text-6xl text-foreground tracking-tight leading-tight">
            The Agent OS.
          </h1>
          <p class="text-muted-foreground text-sm md:text-base max-w-[600px] leading-relaxed">
            Self-hosted, highly concurrent, zero telemetry. Built for the modern enterprise.
          </p>
          <!-- A11Y FIRST & PURPLE SCARCITY: Primary CTA is the ONLY purple. Flat atom -> shadow-none. -->
          <button class="bg-primary hover:bg-primary/90 text-primary-foreground active:scale-95 px-8 py-3 rounded-md font-medium shadow-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2">
            Get Started
          </button>
        </div>

      </div>
    </div>

    <!-- Skip Button -->
    <!-- MONOCHROME HOVER & FLAT ATOM & A11Y FIRST -->
    <button v-if="!isSkipped" @click="skipAnimation" 
            class="absolute bottom-8 right-8 z-50 bg-background hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 rounded-md px-4 py-2 text-sm border border-border shadow-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      Skip ⏭
    </button>
  </section>
</template>

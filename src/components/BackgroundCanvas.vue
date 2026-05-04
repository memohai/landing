<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useDark, useEventListener } from '@vueuse/core'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDark = useDark({ initialValue: 'dark' })

// Physics parameters
const MOUSE_LERP = 0.08
const FADE_OUT_DELAY = 1000 // Delay before fading out after movement stops
const FADE_OUT_DURATION = 2000 // Fade out duration

// State tracking
const mouse = { x: 0, y: 0 }
const target = { x: 0, y: 0 }
const alpha = ref(0)
const lastMoveTime = ref(Date.now())
const velocity = ref(0)
const isMoving = ref(false)

// Color synchronization
const glowColor = ref('rgba(255, 255, 255, 0)')

const updateColor = () => {
  if (typeof window === 'undefined') return
  
  // Convert to rgba and adjust base opacity according to theme
  // Simplified handling: use white glow for dark mode, dark glow for light mode
  if (isDark.value) {
    glowColor.value = `255, 255, 255`
  } else {
    glowColor.value = `15, 23, 42` // Close to slate-900
  }
}

const onMouseMove = (e: MouseEvent) => {
  const now = Date.now()
  const dx = e.clientX - target.x
  const dy = e.clientY - target.y
  velocity.value = Math.sqrt(dx * dx + dy * dy)
  
  target.x = e.clientX
  target.y = e.clientY
  lastMoveTime.value = now
  isMoving.value = true
  
  // Activate alpha
  if (alpha.value < 1) {
    alpha.value = Math.min(1, alpha.value + 0.1)
  }
}

const resize = () => {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

let animationFrameId: number

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Update smooth position (Lerp)
  mouse.x += (target.x - mouse.x) * MOUSE_LERP
  mouse.y += (target.y - mouse.y) * MOUSE_LERP

  // Handle fade out logic
  const now = Date.now()
  const timeSinceMove = now - lastMoveTime.value
  
  if (timeSinceMove > FADE_OUT_DELAY) {
    const fadeProgress = (timeSinceMove - FADE_OUT_DELAY) / FADE_OUT_DURATION
    alpha.value = Math.max(0, 1 - fadeProgress)
    if (alpha.value === 0) isMoving.value = false
  }

  if (alpha.value > 0) {
    // Dynamically adjust radius and intensity based on velocity
    const speedBonus = Math.min(velocity.value / 100, 0.2)
    const baseRadius = 600
    const dynamicRadius = baseRadius * (1 + speedBonus * 0.5)
    
    // Set opacity coefficient
    const baseAlpha = isDark.value ? 0.04 : 0.015
    const currentAlpha = alpha.value * (baseAlpha + speedBonus * 0.01)

    // Create radial gradient
    const gradient = ctx.createRadialGradient(
      mouse.x, mouse.y, 0,
      mouse.x, mouse.y, dynamicRadius
    )
    
    gradient.addColorStop(0, `rgba(${glowColor.value}, ${currentAlpha})`)
    gradient.addColorStop(0.2, `rgba(${glowColor.value}, ${currentAlpha * 0.6})`)
    gradient.addColorStop(1, `rgba(${glowColor.value}, 0)`)

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  // Decay velocity every frame
  velocity.value *= 0.95

  animationFrameId = requestAnimationFrame(draw)
}

onMounted(() => {
  updateColor()
  resize()
  window.addEventListener('resize', resize)
  useEventListener(window, 'mousemove', onMouseMove)
  animationFrameId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animationFrameId)
})

watch(isDark, () => {
  updateColor()
})
</script>

<template>
  <!-- Display only on non-touch screens to save performance -->
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-[-10] opacity-100 transition-opacity duration-1000 hidden lg:block"
    aria-hidden="true"
  />
</template>

<style scoped>
/* Ensure Canvas always covers full screen without affecting interaction */
canvas {
  will-change: transform;
}
</style>
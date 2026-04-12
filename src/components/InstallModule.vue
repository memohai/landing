<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Copy, Check } from 'lucide-vue-next'

const targetRef = ref(null)
const isVisible = ref(false)
const copied = ref(false)
const isRippling = ref(false)

const visibleLines = ref<number[]>([])

// 完整的提炼版脚本输出
const terminalScript = [
  { id: 1, delay: 200, text: '[+] Starting Memoh Cluster...', type: 'info', mobileHide: false },
  { id: 2, delay: 400, text: ' ✔ Container memoh-db         Started', type: 'success', mobileHide: true },
  { id: 3, delay: 600, text: ' ✔ Container memoh-core       Started', type: 'success', mobileHide: true },
  { id: 4, delay: 800, text: ' ✔ Container memoh-agents     Started', type: 'success', mobileHide: true },
  { id: 5, delay: 1100, text: 'SUCCESS: Agent nexus-01 initialized.', type: 'highlight', mobileHide: true },
  { id: 6, delay: 1300, text: '', type: 'empty', mobileHide: false },
  { id: 7, delay: 1500, text: '✅ Memoh is running!', type: 'final', mobileHide: false },
  { id: 8, delay: 1700, text: '  🌐 Web UI:            http://localhost:8082', type: 'link', mobileHide: false },
  { id: 9, delay: 1900, text: '  🔌 API:               http://localhost:8080', type: 'link', mobileHide: false },
  { id: 10, delay: 2100, text: '  🤖 Agent Gateway:     http://localhost:8081', type: 'link', mobileHide: false },
]

useIntersectionObserver(
  targetRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !isVisible.value) {
      isVisible.value = true
      // 触发动画
      terminalScript.forEach(line => {
        setTimeout(() => {
          visibleLines.value.push(line.id)
        }, line.delay)
      })
    }
  },
  { threshold: 0.2 }
)

const copyCommand = async () => {
  if (copied.value) return
  
  try {
    await navigator.clipboard.writeText('curl -sL https://memoh.sh | bash')
    copied.value = true
    isRippling.value = true
    
    setTimeout(() => {
      isRippling.value = false
    }, 150)

    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy command', err)
  }
}
</script>

<template>
  <section ref="targetRef" class="w-full flex flex-col items-center py-[80px] md:py-[120px] px-4 md:px-8 border-b border-border bg-background">
    
    <!-- 整体作为一个容器上浮 (Simultaneous Reveal) -->
    <div class="flex flex-col items-center w-full max-w-[700px] transition-all duration-1000 ease-out"
         :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
      
      <!-- 文本组 -->
      <div class="flex flex-col items-center text-center gap-4 mb-10">
        <h2 class="font-bold text-3xl md:text-4xl tracking-tight text-foreground">
          Deploy in one command.
        </h2>
        <p class="text-sm md:text-base leading-relaxed text-muted-foreground">
          A single script to orchestrate containers, memory, and models. Zero complex dependencies to get your Agent OS running.
        </p>
      </div>

      <!-- 代码安装框 (Flat Atom) -->
      <div class="w-full relative flex items-center justify-between p-1.5 md:p-2 rounded-lg border border-border bg-muted/30 overflow-hidden transition-colors duration-300 mb-6"
           :class="{'bg-emerald-500/10 border-emerald-500/50': isRippling}">
        
        <div class="flex items-center px-3 md:px-4 overflow-x-auto no-scrollbar">
          <code class="font-mono text-sm md:text-[15px] text-foreground whitespace-nowrap">
            curl -sL https://memoh.sh | bash
          </code>
        </div>

        <!-- 极简纯粹的交互按钮 -->
        <button @click="copyCommand" 
                class="flex items-center justify-center shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-transparent hover:border-border"
                :aria-label="copied ? 'Copied' : 'Copy command'">
          <transition name="fade" mode="out-in">
            <Check v-if="copied" class="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
            <Copy v-else class="w-4 h-4 md:w-5 md:h-5" />
          </transition>
        </button>
      </div>

      <!-- 终端动画区块 (Subtle Borderless Canvas) -->
      <!-- Flat Atom: no shadow, rely on border-border and bg-muted/10 -->
      <div class="w-full text-left p-6 md:p-8 rounded-lg border border-border bg-muted/10 font-mono text-sm md:text-[15px] leading-relaxed shadow-none min-h-[160px] md:min-h-[280px]">
        <div v-for="line in terminalScript" :key="line.id"
             :class="{
               'hidden md:block': line.mobileHide, // 移动端降级 (Extreme Mobile Truncation)
               'opacity-100': visibleLines.includes(line.id),
               'opacity-0': !visibleLines.includes(line.id)
             }"
             class="transition-opacity duration-300 ease-out whitespace-pre-wrap">
          
          <!-- 语法高亮调色板 (Brand Monochrome + Green) -->
          <template v-if="line.type === 'info'">
            <span class="text-muted-foreground">{{ line.text }}</span>
          </template>
          
          <template v-else-if="line.type === 'success'">
            <span class="text-muted-foreground">{{ line.text.split('Started')[0] }}</span>
            <span class="text-emerald-500">Started</span>
          </template>
          
          <template v-else-if="line.type === 'highlight'">
            <span class="text-emerald-500 font-medium">SUCCESS:</span>
            <span class="text-muted-foreground"> Agent nexus-01 initialized.</span>
          </template>
          
          <template v-else-if="line.type === 'final'">
            <span class="text-emerald-500 font-medium">✅ Memoh is running!</span>
          </template>
          
          <template v-else-if="line.type === 'link'">
            <span class="text-muted-foreground">{{ line.text.split('http')[0] }}</span>
            <a href="https://memoh.ai" class="text-primary hover:underline underline-offset-4">http{{ line.text.split('http')[1] }}</a>
          </template>

          <template v-else>
            <span>&nbsp;</span>
          </template>
          
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
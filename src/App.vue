<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'
import HeroSection from './components/HeroSection.vue'
import InstallModule from './components/InstallModule.vue'
import UseCasesGrid from './components/UseCasesGrid.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="min-h-screen font-sans overflow-x-hidden bg-background text-foreground">
    <!-- Center the content area -->
    <div class="w-full flex flex-col items-center">
      
      <!-- Navigation -->
      <!-- Flat Atom: no shadow, rely on border-border -->
      <header class="sticky top-0 z-50 w-full backdrop-blur flex justify-center border-b bg-background/80 border-border shadow-none">
        <div class="max-w-[1080px] w-full h-14 px-4 md:px-8 flex items-center justify-between">
          <div class="flex items-center gap-4 sm:gap-6 md:gap-10 overflow-hidden w-full">
            <a href="https://github.com/memohai/Memoh" target="_blank" rel="noopener noreferrer" class="flex items-center shrink-0">
              <span class="font-bold text-lg tracking-tight text-foreground">Memoh</span>
            </a>
            <!-- Monochrome Hover & a11y First. Adjusted gap and padding for perfect alignment -->
            <!-- We apply overflow-x-auto ONLY to the nav to allow scrolling on small screens without pushing the theme toggle away -->
            <nav class="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full no-scrollbar">
              <a href="https://docs.memoh.ai" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">Docs</a>
              <a href="https://github.com/memohai/Memoh" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">GitHub</a>
              <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap">Supermarket</a>
            </nav>
          </div>
          
          <!-- Theme Toggle Button -->
          <!-- shrink-0 prevents the button from squishing, flex-none also helps -->
          <div class="flex items-center ml-2 sm:ml-4 shrink-0 flex-none">
            <button @click="toggleDark()" 
                    class="flex items-center justify-center w-9 h-9 min-w-[36px] min-h-[36px] rounded-md bg-transparent hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-none border border-transparent hover:border-border" 
                    aria-label="Toggle theme">
              <Sun v-if="isDark" class="w-4 h-4 shrink-0" />
              <Moon v-else class="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </header>

      <!-- ====== 动态收敛的首屏动效模块 ====== -->
      <HeroSection />
      <!-- ==================================== -->

      <!-- ====== 新的一键安装模块 ====== -->
      <InstallModule />
      <!-- ==================================== -->

      <!-- ====== 核心应用场景网格 ====== -->
      <UseCasesGrid />
      <!-- ==================================== -->

      <!-- Module 3: The Virtual Computer Architecture -->
      <section class="max-w-[1080px] w-full py-[80px] flex flex-col items-center gap-10 px-4 md:px-8 border-b border-border">
        <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-center text-foreground">
          The Virtual Computer Architecture
        </h2>
        <!-- Flat Atom: no shadow on the grid container -->
        <div class="w-full grid grid-cols-1 md:grid-cols-3 border border-border rounded-md overflow-hidden bg-background shadow-none">
          
          <div class="flex flex-col p-8 md:p-10 gap-6 border-b md:border-b-0 md:border-r border-border">
            <div class="w-10 h-10 rounded-md border border-border bg-muted flex items-center justify-center text-foreground">
              <!-- Icon -->
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
            <div>
              <h3 class="font-medium text-base mb-2 text-foreground">Containerized Isolation</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                Every bot runs in its own 'virtual computer' via containerd. Isolated filesystems and networks ensure the host is safe even if a tool fails.
              </p>
            </div>
          </div>
          
          <div class="flex flex-col p-8 md:p-10 gap-6 border-b md:border-b-0 md:border-r border-border">
            <div class="w-10 h-10 rounded-md border border-border bg-muted flex items-center justify-center text-foreground">
              <!-- Icon -->
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <div>
              <h3 class="font-medium text-base mb-2 text-foreground">Advanced Memory</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                Pluggable hybrid retrieval (Dense + Sparse + BM25) paired with LLM-driven fact extraction. Bots maintain autonomous long-term recall.
              </p>
            </div>
          </div>

          <div class="flex flex-col p-8 md:p-10 gap-6">
            <div class="w-10 h-10 rounded-md border border-border bg-muted flex items-center justify-center text-foreground">
              <!-- Icon -->
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            </div>
            <div>
              <h3 class="font-medium text-base mb-2 text-foreground">Omnichannel Native</h3>
              <p class="text-sm leading-relaxed text-muted-foreground">
                First-class support for Telegram, Discord, Lark, WeChat, Matrix, and Email. Deploy your agent logic once and interact anywhere.
              </p>
            </div>
          </div>

        </div>
      </section>

      <!-- Module 4: Memoh Ecosystem -->
      <section class="max-w-[800px] w-full py-[80px] flex flex-col gap-8 px-4 md:px-8">
        <h2 class="font-semibold text-xl md:text-2xl tracking-tight text-foreground">
          Ecosystem & SDKs
        </h2>
        <div class="flex flex-col border border-border rounded-md bg-background overflow-hidden shadow-none">
          <!-- Row 1 -->
          <a href="https://github.com/memohai/supermarket" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-border hover:bg-accent transition-colors focus-visible:outline-none focus-visible:bg-accent group">
            <div class="flex items-center gap-4">
              <span class="font-medium text-sm text-foreground">Memoh / Supermarket</span>
            </div>
            <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">Official Skill & MCP Registry &rarr;</span>
          </a>
          <!-- Row 2 -->
          <a href="https://github.com/memohai/twilight-ai" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b border-border hover:bg-accent transition-colors focus-visible:outline-none focus-visible:bg-accent group">
            <div class="flex items-center gap-4">
              <span class="font-medium text-sm text-foreground">Memoh / twilight-ai</span>
            </div>
            <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">Lightweight AI SDK for Go &rarr;</span>
          </a>
          <!-- Row 3 -->
          <a href="https://github.com/memohai/Autofish" target="_blank" rel="noopener noreferrer" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:bg-accent group">
            <div class="flex items-center gap-4">
              <span class="font-medium text-sm text-foreground">Memoh / Autofish</span>
            </div>
            <span class="text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-2 sm:mt-0">Android Device Automation Agent &rarr;</span>
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="w-full max-w-[1080px] py-[60px] border-t flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8 border-border">
        <span class="text-sm text-muted-foreground">© 2026 MemohAI. Open Source.</span>
        <div class="flex gap-6">
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
          <a href="https://memoh.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
        </div>
      </footer>

    </div>
  </div>
</template>

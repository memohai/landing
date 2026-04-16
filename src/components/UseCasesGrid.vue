<script setup lang="ts">
const cases = [
  {
    id: 1,
    title: '24/7 Always-on Assistant',
    description: 'Deploys across Telegram, Discord, and WeChat seamlessly. Your agent maintains perfect conversational context across all devices, acting as a true digital twin.',
    size: 'md:col-span-2 md:row-span-2',
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
    tech: ['Go', 'WebSockets', 'Matrix Protocol']
  },
  {
    id: 2,
    title: 'Autonomous Web Researcher',
    description: 'Schedule cron jobs to scrape sites, fill forms, and synthesize reports automatically. Powered by headless browser automation running securely inside the container.',
    size: 'md:col-span-2 md:row-span-1',
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
    tech: ['Playwright', 'Cron', 'Puppeteer']
  },
  {
    id: 3,
    title: 'Private Knowledge Gateway',
    description: 'Feed your private documents to the agent. It uses hybrid search (Dense + Sparse + BM25) to provide precise, hallucination-free answers without exposing your data.',
    size: 'md:col-span-1 md:row-span-1',
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`,
    tech: ['Vector DB', 'BM25', 'RAG']
  },
  {
    id: 4,
    title: 'Team Orchestrator',
    description: 'Deploy in group chats. The agent recognizes individuals, maintains strict ACLs, and orchestrates tasks securely among team members.',
    size: 'md:col-span-1 md:row-span-1',
    icon: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    tech: ['ACL', 'RBAC', 'Multi-tenant']
  }
]
</script>

<template>
  <section class="max-w-[1080px] w-full py-[80px] flex flex-col items-center gap-10 px-4 md:px-8 border-b border-border">
    <div class="flex flex-col items-center text-center gap-4">
      <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-foreground">
        Built for Production Scenarios.
      </h2>
      <p class="text-sm md:text-base text-muted-foreground max-w-[600px]">
        From personal assistants to enterprise orchestrators, Memoh provides the isolated environment and memory architecture to run complex agentic workflows.
      </p>
    </div>

    <!-- Bento Grid (Industrial Minimal) -->
    <div class="w-full grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
      
      <div v-for="item in cases" :key="item.id" 
           :class="[
             'group relative flex flex-col overflow-hidden rounded-xl border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:border-foreground/20 hover:bg-accent/50 cursor-default',
             item.size
           ]"
           tabindex="0">
        
        <!-- Icon -->
        <div class="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-foreground transition-colors group-hover:bg-foreground group-hover:text-background" v-html="item.icon">
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-2 relative z-10 flex-grow">
          <h3 class="font-semibold text-lg text-foreground tracking-tight">{{ item.title }}</h3>
          <p class="text-sm text-muted-foreground leading-relaxed">{{ item.description }}</p>
        </div>

        <!-- Tech Badges -->
        <div class="mt-6 flex gap-2 flex-wrap opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span v-for="tech in item.tech" :key="tech" class="inline-flex items-center rounded-md border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground/80 font-mono">
            {{ tech }}
          </span>
        </div>
        
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Industrial minimalist aesthetics rely on clean lines and subtle transitions */
</style>
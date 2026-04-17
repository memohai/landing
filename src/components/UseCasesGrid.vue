<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Users, Box, Brain, MessageSquare, Wrench, Globe, 
  Theater, MessagesSquare, Clock, LayoutDashboard, 
  ShieldCheck, FlaskConical, Rocket 
} from 'lucide-vue-next'

const { t } = useI18n()

const sections = computed(() => [
  {
    id: 'core',
    title: t('usecases.sections.core'),
    items: [
      { id: 1, key: 'f1', icon: Users, size: 'md:col-span-2', soul: true },
      { id: 2, key: 'f2', icon: Box, size: 'md:col-span-1' },
      { id: 4, key: 'f4', icon: MessageSquare, size: 'md:col-span-1' },
      { id: 3, key: 'f3', icon: Brain, size: 'md:col-span-2', soul: true },
    ]
  },
  {
    id: 'agent',
    title: t('usecases.sections.agent'),
    items: [
      { id: 5, key: 'f5', icon: Wrench, size: 'md:col-span-1' },
      { id: 6, key: 'f6', icon: Globe, size: 'md:col-span-1' },
      { id: 7, key: 'f7', icon: Theater, size: 'md:col-span-1' },
      { id: 8, key: 'f8', icon: MessagesSquare, size: 'md:col-span-2' },
      { id: 9, key: 'f9', icon: Clock, size: 'md:col-span-1' },
    ]
  },
  {
    id: 'mgmt',
    title: t('usecases.sections.mgmt'),
    items: [
      { id: 10, key: 'f10', icon: LayoutDashboard, size: 'md:col-span-2' },
      { id: 11, key: 'f11', icon: ShieldCheck, size: 'md:col-span-1' },
      { id: 12, key: 'f12', icon: FlaskConical, size: 'md:col-span-1' },
      { id: 13, key: 'f13', icon: Rocket, size: 'md:col-span-2' },
    ]
  }
])
</script>

<template>
  <section class="max-w-[1080px] w-full py-[80px] flex flex-col items-center gap-16 px-4 md:px-8 border-b border-border">
    <div class="flex flex-col items-center text-center gap-4">
      <h2 class="font-semibold text-2xl md:text-3xl tracking-tight text-foreground">
        {{ t('usecases.title') }}
      </h2>
      <p class="text-sm md:text-base text-muted-foreground max-w-[600px]">
        {{ t('usecases.subtitle') }}
      </p>
    </div>

    <div v-for="section in sections" :key="section.id" class="w-full flex flex-col gap-6">
      <!-- Section Title -->
      <div class="flex items-center gap-4">
        <h3 class="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 whitespace-nowrap">
          {{ section.title }}
        </h3>
        <div class="h-px w-full bg-border/50"></div>
      </div>

      <!-- Bento Grid -->
      <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        <div v-for="item in section.items" :key="item.id" 
             :class="[
               'group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-background p-6 md:p-8 transition-all duration-300 hover:bg-accent/30 cursor-default shadow-none',
               item.size
             ]"
             tabindex="0">
          
          <div class="flex flex-col gap-4">
            <!-- Icon with Hover Transition to Primary Color -->
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/30 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:border-primary/20 group-hover:bg-primary/5">
              <component :is="item.icon" :size="20" stroke-width="2" />
            </div>

            <!-- Content -->
            <div class="flex flex-col gap-2 relative z-10">
              <h4 class="font-semibold text-base md:text-lg text-foreground tracking-tight">{{ t('usecases.items.' + item.key + '.title') }}</h4>
              <p class="text-sm text-muted-foreground leading-relaxed">{{ t('usecases.items.' + item.key + '.desc') }}</p>
            </div>
          </div>
          
          <!-- Subtle corner accent for soul items -->
          <div v-if="item.soul" class="absolute top-0 right-0 w-16 h-16 bg-primary/5 [mask-image:radial-gradient(circle_at_top_right,white,transparent_70%)] pointer-events-none"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Grid consistency and hierarchy maintained via Tailwind utility classes */
</style>

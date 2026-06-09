<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { ArrowRight, Check, FileText } from 'lucide-vue-next'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/ month',
    badge: 'Placeholder',
    description: 'A quiet placeholder tier for trying the Memoh workspace shape.',
    action: 'Start placeholder',
    highlighted: false,
    features: [
      'Lorem workspace quota',
      'Ipsum agent runtime',
      'Dolor memory window',
      'Sit amet support lane',
    ],
  },
  {
    name: 'Builder',
    price: '$29',
    period: '/ month',
    badge: 'Popular',
    description: 'A middle placeholder tier for teams that need more room to test.',
    action: 'Choose Builder',
    highlighted: true,
    features: [
      'Consectetur agent seats',
      'Adipiscing compute minutes',
      'Tempor file retention',
      'Incididunt integration slots',
    ],
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: '',
    badge: 'Team',
    description: 'A flexible placeholder tier for bigger deployment conversations.',
    action: 'Talk to us',
    highlighted: false,
    features: [
      'Enterprise placeholder limits',
      'Dedicated lorem channel',
      'Custom ipsum policies',
      'Priority dolor review',
    ],
  },
]

const comparisonRows = [
  ['Agent workspaces', '1 lorem', '8 lorem', 'Custom lorem'],
  ['Persistent storage', 'Basic ipsum', 'Team ipsum', 'Private ipsum'],
  ['Automation runs', 'Small dolor', 'More dolor', 'Custom dolor'],
  ['Support', 'Community sit', 'Priority sit', 'Dedicated sit'],
]

const notes = [
  {
    title: 'Bring your own keys',
    body: 'Placeholder billing language for model routing, API keys, and usage ownership.',
  },
  {
    title: 'Self-host friendly',
    body: 'Placeholder deployment language for local, cloud, and hybrid Memoh setups.',
  },
  {
    title: 'Upgrade later',
    body: 'Placeholder account language for changing plans when the real pricing lands.',
  },
]

useSeoMeta({
  title: 'Pricing | Memoh',
  description: 'Placeholder pricing plans for Memoh.',
  ogTitle: 'Pricing | Memoh',
  ogDescription: 'Placeholder pricing plans for Memoh.',
  ogType: 'website',
  ogUrl: 'https://memoh.ai/pricing',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Pricing | Memoh',
  twitterDescription: 'Placeholder pricing plans for Memoh.',
})
</script>

<template>
  <main class="w-full max-w-[1080px] min-h-[calc(100vh-3.5rem)] mx-auto px-4 md:px-8 pt-[112px] md:pt-[148px] pb-[120px] relative z-10">
    <section class="flex flex-col gap-12">
      <header class="max-w-[760px] flex flex-col gap-5">
        <div class="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <FileText class="w-3.5 h-3.5" />
          Memoh Pricing
        </div>
        <div class="flex flex-col gap-4">
          <h1 class="text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
            Pricing that stays out of the way.
          </h1>
          <p class="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[680px]">
            Placeholder plans for agents with their own computers, persistent files, and always-on workspaces.
          </p>
        </div>
      </header>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article
          v-for="plan in plans"
          :key="plan.name"
          class="flex min-h-[520px] flex-col rounded-xl border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          :class="plan.highlighted ? 'border-foreground shadow-sm' : 'border-border'"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-medium uppercase tracking-[0.16em] text-primary">{{ plan.badge }}</span>
              <h2 class="text-xl font-semibold tracking-tight text-foreground">{{ plan.name }}</h2>
            </div>
            <span
              v-if="plan.highlighted"
              class="rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background"
            >
              Best fit
            </span>
          </div>

          <p class="mt-5 text-sm text-muted-foreground leading-relaxed">
            {{ plan.description }}
          </p>

          <div class="mt-7 flex items-end gap-1">
            <span class="text-4xl font-semibold tracking-tight text-foreground">{{ plan.price }}</span>
            <span v-if="plan.period" class="pb-1.5 text-sm text-muted-foreground">{{ plan.period }}</span>
          </div>

          <a
            href="https://docs.memoh.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-pill mt-7 inline-flex h-11 items-center justify-center gap-2 px-5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            :class="plan.highlighted ? 'btn-pill-primary' : 'btn-pill-secondary'"
          >
            <span>{{ plan.action }}</span>
            <ArrowRight class="w-4 h-4" />
          </a>

          <div class="mt-8 border-t border-border pt-5">
            <p class="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/75">
              Included
            </p>
            <ul class="flex flex-col gap-3">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <Check class="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                <span class="leading-relaxed">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </article>
      </section>

      <section class="overflow-hidden rounded-xl border border-border bg-background">
        <div class="border-b border-border p-5 md:p-6">
          <h2 class="text-xl font-semibold tracking-tight text-foreground">Compare the placeholders</h2>
          <p class="mt-2 max-w-[640px] text-sm text-muted-foreground leading-relaxed">
            These entries are intentionally temporary, but the layout is ready for real pricing details.
          </p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[720px] text-left text-sm">
            <thead class="border-b border-border text-xs uppercase tracking-[0.14em] text-muted-foreground/75">
              <tr>
                <th class="px-5 py-4 font-medium">Capability</th>
                <th class="px-5 py-4 font-medium">Starter</th>
                <th class="px-5 py-4 font-medium">Builder</th>
                <th class="px-5 py-4 font-medium">Scale</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in comparisonRows"
                :key="row[0]"
                class="border-b border-border last:border-b-0"
              >
                <td class="px-5 py-4 font-medium text-foreground">{{ row[0] }}</td>
                <td class="px-5 py-4 text-muted-foreground">{{ row[1] }}</td>
                <td class="px-5 py-4 text-muted-foreground">{{ row[2] }}</td>
                <td class="px-5 py-4 text-muted-foreground">{{ row[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article
          v-for="note in notes"
          :key="note.title"
          class="rounded-xl border border-border bg-background p-5"
        >
          <h2 class="text-base font-semibold tracking-tight text-foreground">{{ note.title }}</h2>
          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            {{ note.body }}
          </p>
        </article>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ArrowRight, Github } from 'lucide-vue-next'
import sunsetBg from '../assets/sunset.png'
import heroShot from '../assets/hero-shot.png'
</script>

<template>
  <!-- HERO: full-bleed sunset sky + real app screenshot. -->
  <section class="relative w-full">
    <!-- Sky stage: sized close to the image ratio so the whole scene (cat + train) stays visible -->
    <div class="relative w-full h-[86vh] min-h-[640px] max-h-[880px] flex items-start justify-center overflow-hidden">
      <img
        :src="sunsetBg"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <!-- Scrims: nav darkening and bottom fade into the page -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10"></div>
      <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background"></div>

      <!-- Content: headline + subtitle centered -->
      <div class="relative z-10 w-full max-w-[1100px] mx-auto px-4 md:px-8 flex flex-col items-center text-center pt-40 md:pt-52">
        <h1 class="font-serif font-medium text-white tracking-tight leading-[1.04] text-5xl md:text-6xl [text-shadow:0_1px_12px_oklch(0_0_0/0.18)] whitespace-pre-line">{{ $t('hero.title') }}</h1>

        <p class="mt-6 max-w-[760px] text-base md:text-lg text-white/92 leading-relaxed drop-shadow-sm whitespace-pre-line">
          {{ $t('hero.subtitle') }}
        </p>

        <!-- CTAs — page-local treatment adapted from the @memohai/ui button contract -->
        <div class="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            class="hero-btn hero-btn-primary inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {{ $t('hero.ctaPrimary') }}
            <ArrowRight :size="18" />
          </a>
          <a
            href="https://github.com/memohai/Memoh"
            target="_blank"
            rel="noreferrer"
            class="hero-btn hero-btn-secondary inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Github :size="18" />
            {{ $t('hero.ctaSecondary') }}
          </a>
        </div>
      </div>
    </div>

    <!-- App screenshot — overlaps the sky bottom, continues onto the page background -->
    <div class="relative z-20 w-full max-w-[1040px] mx-auto px-4 md:px-6 -mt-[40px] md:-mt-[90px]">
      <div class="rounded-xl overflow-hidden border border-white/10 ring-1 ring-black/5 shadow-2xl shadow-black/40 bg-[#0d1117]">
        <img
          :src="heroShot"
          alt="Memoh workspace"
          class="w-full h-auto block"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Adapted from @memohai/ui button contract bench (primary hover sheen + micro-scale).
   Shape kept as a pill instead of the library's rounded-lg. */
.hero-btn {
  position: relative;
  isolation: isolate;
  backface-visibility: hidden;
  transition: scale 0.15s ease-out;
}

/* ── Primary: faithful to @memohai/ui contract "Save" (neutral tone) ──
   ::before = --foreground fill (scales), ::after = bottom-up white sheen.
   No drop shadow — exactly like the component bench. */
.hero-btn-primary {
  color: var(--background);
}
.hero-btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: var(--foreground);
  transition:
    scale 0.3s linear(0, .3505, .7432, .9336, .9951, 1.0062, 1.0045, 1.0019, 1.0005, 1),
    background-color 0.15s ease-out;
}
/* Hover darken overlay — sits above the fill but BELOW the text (z-index -1),
   so a light/white button gets a proper darken-on-hover in dark mode. */
.hero-btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: rgba(0, 0, 0, 0.06);
  opacity: 0;
  transition: opacity 0.18s ease-out, background-color 0.18s ease-out;
}
.hero-btn-primary:hover::before {
  scale: 1.005 1.015;
}
.hero-btn-primary:hover::after {
  opacity: 1;
}
.hero-btn-primary:active::after {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.12);
}

/* ── Secondary: frosted glass (original feel) — fill on ::before so text never scales ── */
.hero-btn-secondary::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background-color: oklch(1 0 0 / 0.10);
  box-shadow: inset 0 0 0 1px oklch(1 0 0 / 0.30);
  backdrop-filter: blur(8px);
  transition:
    scale 0.3s linear(0, .3505, .7432, .9336, .9951, 1.0062, 1.0045, 1.0019, 1.0005, 1),
    background-color 0.15s ease-out;
}
.hero-btn-secondary:hover::before {
  background-color: oklch(1 0 0 / 0.20);
  scale: 1.005 1.015;
}
.hero-btn-secondary:active::before {
  scale: 0.97;
}
</style>

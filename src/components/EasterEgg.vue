<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// ── 主随机池（7种）──────────────────────────────────────
const MAIN_CLIPS = [
  { id: 'a1', src: '/egg-a1.mp4', weight: 10, group: 1 },
  { id: 'a2', src: '/egg-a2.mp4', weight: 10, group: 1 },
  { id: 'b1', src: '/egg-b1.mp4', weight: 15, group: 2 },
  { id: 'b2', src: '/egg-b2.mp4', weight: 15, group: 2 },
  { id: 'c1', src: '/egg-c1.mp4', weight: 15, group: 1 },
  { id: 'd1', src: '/egg-d1.mp4', weight: 15, group: 2 },
  { id: 'd2', src: '/egg-d2.mp4', weight: 15, group: 2 },
]
const ALL_IDS = new Set(MAIN_CLIPS.map(c => c.id))

// ── 特殊视频 ───────────────────────────────────────────
const STARTLE_SRC = '/egg-e1.mp4'   // E1: 快速连点炸毛
const BOARD_SRC   = '/egg-e3.mp4'   // E3: 黑板变 Memoh
const GIFT_SRC    = '/egg-e4.mp4'   // E4: 终极彩蛋叼鱼

const debug = computed(() => new URLSearchParams(location.search).has('debug'))

// ── state ─────────────────────────────────────────────
const videoRefs   = ref<Record<string, HTMLVideoElement>>({})
const activeClip  = ref<string | null>(null)
const lastClip    = ref<string | null>(null)
const lastGroup   = ref<number | null>(null)
const groupStreak = ref(0)
const busy        = ref(false)

// localStorage: 记录已看过的视频 id
const SEEN_KEY = 'memoh_egg_seen'
function getSeen(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]')) } catch { return new Set() }
}
function addSeen(id: string) {
  const s = getSeen(); s.add(id)
  try { localStorage.setItem(SEEN_KEY, JSON.stringify([...s])) } catch {}
}
function hasSeenAll(): boolean {
  const s = getSeen()
  return [...ALL_IDS].every(id => s.has(id))
}

// 快速连点检测：延迟播放，给连点积累时间
const clickTimes: number[] = []
let pendingPlay: ReturnType<typeof setTimeout> | null = null

function schedulePlay(fn: () => void) {
  if (pendingPlay) clearTimeout(pendingPlay)
  pendingPlay = setTimeout(() => {
    pendingPlay = null
    fn()
  }, 500)
}

// ── 随机策略 ───────────────────────────────────────────
function pickRandom(): typeof MAIN_CLIPS[0] {
  const forcedGroup = groupStreak.value >= 2 ? (lastGroup.value === 1 ? 2 : 1) : null
  const pool = MAIN_CLIPS.filter(c =>
    c.id !== lastClip.value &&
    (forcedGroup === null || c.group === forcedGroup)
  )
  const total = pool.reduce((s, c) => s + c.weight, 0)
  let r = Math.random() * total
  for (const c of pool) { r -= c.weight; if (r <= 0) return c }
  return pool[pool.length - 1]
}

// ── 播放 ───────────────────────────────────────────────
function setRef(key: string, el: unknown) {
  if (el) videoRefs.value[key] = el as HTMLVideoElement
}

function startClip(key: string, onEnd?: () => void) {
  const v = videoRefs.value[key]
  if (!v) return
  activeClip.value = key
  v.currentTime = 0
  v.playbackRate = 1.5
  v.play()
  if (onEnd) v.addEventListener('ended', onEnd, { once: true })
}

function onClipEnded(key: string) {
  activeClip.value = null
  busy.value = false
}

// E1：点猫热区
function onCatClick() {
  if (busy.value) return

  const now = Date.now()
  clickTimes.push(now)
  while (clickTimes.length > 3) clickTimes.shift()

  // 三连点（1.5s内）→ 立即炸毛
  if (clickTimes.length === 3 && (now - clickTimes[0]) < 1500) {
    if (pendingPlay) { clearTimeout(pendingPlay); pendingPlay = null }
    clickTimes.length = 0
    busy.value = true
    startClip('e1', () => onClipEnded('e1'))
    return
  }

  // 普通点击：延迟 500ms 再播，给连点时间积累
  schedulePlay(() => {
    if (busy.value) return
    clickTimes.length = 0
    // 集齐 7 种 → 终极彩蛋，播完后清空记录重新积累
    if (hasSeenAll()) {
      busy.value = true
      try { localStorage.removeItem(SEEN_KEY) } catch {}
      startClip('e4', () => onClipEnded('e4'))
      return
    }
    // 普通随机
    busy.value = true
    const chosen = pickRandom()
    if (chosen.group === lastGroup.value) groupStreak.value++
    else { groupStreak.value = 1; lastGroup.value = chosen.group }
    lastClip.value = chosen.id
    addSeen(chosen.id)
    startClip(chosen.id, () => onClipEnded(chosen.id))
  })
}

// E3：点黑板
function onBoardClick() {
  if (busy.value) return
  busy.value = true
  startClip('e3', () => onClipEnded('e3'))
}

// ── preload ────────────────────────────────────────────
onMounted(() => {
  // force frame 0 on the still video
  const still = videoRefs.value['still']
  if (still) still.currentTime = 0

  // preload special clips in background
  ;[STARTLE_SRC, BOARD_SRC, GIFT_SRC].forEach(src => {
    const tmp = document.createElement('video')
    tmp.src = src; tmp.preload = 'auto'; tmp.muted = true
    tmp.style.cssText = 'display:none;position:fixed;pointer-events:none'
    document.body.appendChild(tmp)
  })
})
</script>

<template>
  <section class="egg select-none">
    <!-- 静止底层 -->
    <video
      :ref="(el) => setRef('still', el)"
      src="/egg-a1.mp4"
      class="egg-video"
      muted playsinline preload="auto" aria-hidden="true"
    />

    <!-- 主随机 clips -->
    <video
      v-for="clip in MAIN_CLIPS"
      :key="clip.id"
      :src="clip.src"
      :ref="(el) => setRef(clip.id, el)"
      class="egg-video clip-video"
      :class="{ active: activeClip === clip.id }"
      muted playsinline preload="auto" aria-hidden="true"
      @ended="onClipEnded(clip.id)"
    />

    <!-- E1 炸毛 -->
    <video
      :ref="(el) => setRef('e1', el)"
      :src="STARTLE_SRC"
      class="egg-video clip-video"
      :class="{ active: activeClip === 'e1' }"
      muted playsinline preload="auto" aria-hidden="true"
    />

    <!-- E3 黑板 -->
    <video
      :ref="(el) => setRef('e3', el)"
      :src="BOARD_SRC"
      class="egg-video clip-video"
      :class="{ active: activeClip === 'e3' }"
      muted playsinline preload="auto" aria-hidden="true"
    />

    <!-- E4 终极彩蛋 -->
    <video
      :ref="(el) => setRef('e4', el)"
      :src="GIFT_SRC"
      class="egg-video clip-video"
      :class="{ active: activeClip === 'e4' }"
      muted playsinline preload="auto" aria-hidden="true"
    />

    <!-- 猫的点击热区 -->
    <div class="hotspot cat-hotspot" :class="{ 'debug-hotspot': debug }" @click="onCatClick" />

    <!-- 黑板点击热区 -->
    <div class="hotspot board-hotspot" :class="{ 'debug-hotspot': debug }" @click="onBoardClick" />
    <div class="hotspot board-hotspot-2" :class="{ 'debug-hotspot': debug }" @click="onBoardClick" />
  </section>
</template>

<style scoped>
.egg {
  position: relative;
  width: 100%;
  height: clamp(420px, 60vh, 660px);
  overflow: hidden;
  background: #1a1410;
  cursor: default;
}

.egg-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 88%;
  transform: scale(1.08);
  transform-origin: center 88%;
}

.clip-video { opacity: 0; }
.clip-video.active { opacity: 1; }

.hotspot {
  position: absolute;
  z-index: 2;
  cursor: pointer;
}

/* 猫区：右下角，z-index 高于黑板，重叠处优先触发猫 */
.cat-hotspot {
  right: 25%;
  bottom: 2%;
  width: 260px;
  height: 280px;
  z-index: 3;
}

/* 黑板区：右侧中下，高度加高往上延伸 */
.board-hotspot {
  right: 18%;
  bottom: 20%;
  width: 120px;
  height: 210px;
  z-index: 2;
}

/* 黑板区延伸：左上方重叠块 */
.board-hotspot-2 {
  right: 22%;
  bottom: 34%;
  width: 120px;
  height: 210px;
  z-index: 2;
}

.debug-hotspot {
  outline: 2px solid rgba(255, 80, 80, 0.8);
  background: rgba(255, 80, 80, 0.15);
}
</style>

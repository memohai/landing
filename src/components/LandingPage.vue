<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTelegram, faDiscord, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import {
  faBook, faCopy, faCheck, faUsers, faBrain, faBox,
  faRobot, faComments, faClock, faSliders, faShieldHalved,
  faArrowRight, faStar, faCodeBranch, faHeart,
  faMessage, faPaperPlane
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faGithub, faTelegram, faDiscord, faXTwitter,
  faBook, faCopy, faCheck, faUsers, faBrain, faBox,
  faRobot, faComments, faClock, faSliders, faShieldHalved,
  faArrowRight, faStar, faCodeBranch, faHeart,
  faMessage, faPaperPlane
)

const activeTab = ref('docker')
const copied = ref(false)

const features = [
  {
    icon: 'robot',
    title: 'Multi-bot Management',
    description: 'Create multiple bots. Humans and bots, or bots with each other, can chat privately, in groups, or collaborate seamlessly.'
  },
  {
    icon: 'box',
    title: 'Containerized Isolation',
    description: 'Each bot runs in its own isolated container via Containerd — freely execute commands, edit files, and access the network like having its own computer.'
  },
  {
    icon: 'brain',
    title: 'Memory Engineering',
    description: 'Deeply engineered memory layer inspired by Mem0. Every conversation turn is stored as structured knowledge, enabling precise semantic retrieval.'
  },
  {
    icon: 'comments',
    title: 'Multi-Platform Support',
    description: 'Connect your bots to Telegram, Discord, Lark (Feishu) and more. One system, all your favorite messaging platforms.'
  },
  {
    icon: 'sliders',
    title: 'Visual Configuration',
    description: 'Full graphical interface to configure bots, Providers, Models, Memory, Channels, MCP, and Skills — no coding required.'
  },
  {
    icon: 'clock',
    title: 'Scheduled Tasks',
    description: 'Schedule tasks with cron expressions to run commands at specified times. Automate routine work for your bots effortlessly.'
  }
]

const advantages = [
  {
    icon: 'shield-halved',
    title: 'Secure',
    description: 'Container-level isolation protects each bot and your host system from unintended side effects.'
  },
  {
    icon: 'sliders',
    title: 'Simple',
    description: 'Full GUI configuration — no YAML editing or CLI-only workflows. Get started in minutes.'
  },
  {
    icon: 'code-branch',
    title: 'Open Source',
    description: 'Built with Golang, fully open-source under AGPLv3. Transparent, auditable, community-driven.'
  }
]

const platforms = [
  { name: 'Telegram', icon: ['fab', 'telegram'], color: 'text-sky-500' },
  { name: 'Discord', icon: ['fab', 'discord'], color: 'text-indigo-500' },
  { name: 'Lark / Feishu', icon: 'message', color: 'text-blue-500' },
  { name: 'More...', icon: 'paper-plane', color: 'text-purple-500' }
]

const commands = {
  docker: `curl -fsSL https://raw.githubusercontent.com/memohai/Memoh/main/scripts/install.sh | sh`,
  source: `git clone https://github.com/memohai/Memoh.git
cd Memoh
mise install
mise run setup
mise run dev`
}

const copyCommand = (cmd: string) => {
  navigator.clipboard.writeText(cmd)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

// Intersection Observer for scroll animations
const observedElements = ref<IntersectionObserver | null>(null)

onMounted(() => {
  observedElements.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    { threshold: 0.1 }
  )

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observedElements.value?.observe(el)
  })
})

onUnmounted(() => {
  observedElements.value?.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">

    <!-- ==================== Hero Section ==================== -->
    <section class="relative overflow-hidden bg-linear-to-b from-indigo-50 via-white to-gray-50 pt-20 pb-24">
      <!-- Decorative blobs -->
      <div class="absolute top-[-120px] left-[-80px] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-[-80px] right-[-60px] w-[350px] h-[350px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div class="container mx-auto px-4 max-w-5xl relative z-10">
        <div class="text-center animate-fade-in-up">
          <div class="flex justify-center mb-6">
            <img src="/logo.png" alt="Memoh Logo" class="h-24 w-24 object-contain animate-float" />
          </div>
          <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
            Memoh
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-3">
            Multi-Member, Structured Long-Memory, Containerized AI Agent System
          </p>
          <p class="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Create your own AI bots and chat with them via Telegram, Discord, Lark and more.<br />
            Every bot has its own container and memory — secure, flexible, and scalable.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <a href="https://github.com/memohai/Memoh" target="_blank"
               class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <font-awesome-icon :icon="['fab', 'github']" />
              Star on GitHub
            </a>
            <a href="https://docs.memoh.ai" target="_blank"
               class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <font-awesome-icon icon="book" />
              Documentation
            </a>
            <a href="#quick-start"
               class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <font-awesome-icon icon="arrow-right" />
              Quick Start
            </a>
          </div>

          <!-- Links row -->
          <div class="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://github.com/memohai/Memoh" target="_blank" class="hover:text-gray-900 transition-colors flex items-center gap-1.5">
              <font-awesome-icon :icon="['fab', 'github']" /> GitHub
            </a>
            <a href="https://docs.memoh.ai" target="_blank" class="hover:text-gray-900 transition-colors flex items-center gap-1.5">
              <font-awesome-icon icon="book" /> Docs
            </a>
            <a href="https://t.me/memohai" class="hover:text-gray-900 transition-colors flex items-center gap-1.5">
              <font-awesome-icon :icon="['fab', 'telegram']" /> Telegram
            </a>
            <a href="https://x.com/memoh_ai" target="_blank" class="hover:text-gray-900 transition-colors flex items-center gap-1.5">
              <font-awesome-icon :icon="['fab', 'x-twitter']" /> Twitter
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== What is Memoh ==================== -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl scroll-animate">
        <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-900">
          What is Memoh?
        </h2>
        <p class="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-8">
          Memoh is an AI agent system platform. Users can create their own AI bots and chat with them via
          <strong>Telegram</strong>, <strong>Discord</strong>, <strong>Lark (Feishu)</strong> and more.
          Every bot has an independent container and memory system which allows them to edit files,
          execute commands and build themselves.
        </p>
        <p class="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
          Memoh Bot can distinguish and remember requests from multiple humans and bots, working seamlessly in any group chat.
          Build bot teams, or set up accounts for your family to manage daily tasks with bots.
        </p>
      </div>
    </section>

    <!-- ==================== Why Memoh ==================== -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="text-center mb-14 scroll-animate">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why Memoh?
          </h2>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto">
            Compared to alternatives like OpenClaw, Clawdbot, and Moltbot — Memoh offers a more stable, secure, and easy-to-use solution.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="adv in advantages" :key="adv.title"
               class="scroll-animate p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
            <div class="w-14 h-14 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center mb-5 text-indigo-600">
              <font-awesome-icon :icon="adv.icon" class="text-2xl" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ adv.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ adv.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Features ==================== -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="text-center mb-14 scroll-animate">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Features
          </h2>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto">
            Everything you need to run your own AI bot fleet — out of the box.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title"
               class="scroll-animate p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
              <font-awesome-icon :icon="feature.icon" class="text-xl" />
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Platforms ==================== -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-14 scroll-animate">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Connect Everywhere
          </h2>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto">
            Deploy your bots across all the messaging platforms your team already uses.
          </p>
        </div>

        <div class="flex flex-wrap justify-center gap-6 scroll-animate">
          <div v-for="platform in platforms" :key="platform.name"
               class="flex flex-col items-center gap-3 px-8 py-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 min-w-[140px]">
            <font-awesome-icon :icon="platform.icon" :class="['text-3xl', platform.color]" />
            <span class="font-semibold text-gray-700 text-sm">{{ platform.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== Quick Start ==================== -->
    <section id="quick-start" class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-10 scroll-animate">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Quick Start
          </h2>
          <p class="text-lg text-gray-500">
            Get Memoh running in minutes. Docker or source — your choice.
          </p>
        </div>

        <div class="scroll-animate bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-red-400"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div class="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div class="flex space-x-2 bg-gray-200 p-1 rounded-lg">
              <button 
                @click="activeTab = 'docker'"
                :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200', activeTab === 'docker' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700']"
              >
                Docker
              </button>
              <button 
                @click="activeTab = 'source'"
                :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200', activeTab === 'source' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700']"
              >
                Source
              </button>
            </div>
          </div>
          <div class="p-9 bg-[#1a1b26] group relative min-h-[100px]">
            <transition name="fade" mode="out-in">
               <pre :key="activeTab" class="font-mono text-sm text-gray-300 overflow-x-auto whitespace-pre leading-relaxed">{{ commands[activeTab as keyof typeof commands] }}</pre>
            </transition>
            <button 
              @click="copyCommand(commands[activeTab as keyof typeof commands])"
              class="absolute top-4 right-4 p-2 rounded-md bg-white/10 hover:bg-white/20 text-gray-300 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
              :title="copied ? 'Copied!' : 'Copy to clipboard'"
            >
              <font-awesome-icon :icon="copied ? 'check' : 'copy'" />
            </button>
          </div>
        </div>

        <p class="text-center text-gray-500 text-sm mt-6 scroll-animate">
          Visit <code class="bg-gray-100 px-2 py-0.5 rounded text-indigo-600 text-xs">http://localhost</code> after deployment.
          See the <a href="https://docs.memoh.ai" target="_blank" class="text-indigo-600 hover:underline">documentation</a> for details.
        </p>
      </div>
    </section>

    <!-- ==================== Open Source CTA ==================== -->
    <section class="py-20 bg-linear-to-b from-gray-50 to-indigo-50">
      <div class="container mx-auto px-4 max-w-3xl text-center scroll-animate">
        <div class="w-16 h-16 mx-auto bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
          <font-awesome-icon icon="heart" class="text-2xl" />
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Open Source & Community Driven
        </h2>
        <p class="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
          Memoh is fully open-source under the <strong>AGPLv3</strong> license. Built with
          <strong>Golang</strong>, <strong>Vue</strong>, and <strong>TypeScript</strong>.
          We welcome contributions, feature requests, and feedback from the community.
        </p>

        <div class="flex flex-wrap justify-center gap-4 mb-10">
          <a href="https://github.com/memohai/Memoh" target="_blank"
             class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <font-awesome-icon icon="star" />
            Star on GitHub
          </a>
          <a href="https://github.com/memohai/Memoh/issues" target="_blank"
             class="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:border-indigo-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <font-awesome-icon icon="code-branch" />
            Contribute
          </a>
        </div>

      
      </div>
    </section>

    <!-- ==================== Footer ==================== -->
    <footer class="py-10 bg-white border-t border-gray-100">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Memoh" class="h-8 w-8 object-contain" />
            <span class="font-bold text-gray-700">Memoh</span>
          </div>
          <div class="flex gap-6 text-gray-400 text-sm">
            <a href="https://github.com/memohai/Memoh" target="_blank" class="hover:text-gray-700 transition-colors">GitHub</a>
            <a href="https://docs.memoh.ai" target="_blank" class="hover:text-gray-700 transition-colors">Docs</a>
            <a href="#" class="hover:text-gray-700 transition-colors">Telegram</a>
            <a href="https://github.com/memohai/Memoh/blob/main/LICENSE" target="_blank" class="hover:text-gray-700 transition-colors">AGPLv3</a>
          </div>
          <p class="text-gray-400 text-sm">&copy; {{ new Date().getFullYear() }} Memoh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Custom scrollbar for code block */
pre::-webkit-scrollbar {
  height: 8px;
}
pre::-webkit-scrollbar-track {
  background: #1a1b26;
}
pre::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}
pre::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out backwards;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Scroll-triggered animations */
.scroll-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.scroll-animate.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Transition classes for Vue transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

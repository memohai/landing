<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faBook, faCopy, faCheck, faUsers, faBrain, faBox } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faTelegram, faBook, faCopy, faCheck, faUsers, faBrain, faBox)

const activeTab = ref('docker')
const copied = ref(false)

const features = [
  {
    icon: 'users',
    title: 'Multi-Member',
    description: 'Collaborative AI agent system designed for multi-agent interaction and teamwork.'
  },
  {
    icon: 'brain',
    title: 'Structured Long-Memory',
    description: 'Advanced memory architecture allowing agents to retain and structure information effectively.'
  },
  {
    icon: 'box',
    title: 'Containerized',
    description: 'Fully containerized deployment ensuring consistency and scalability across environments.'
  }
]

const commands = {
  docker: `git clone https://github.com/memohai/Memoh.git
cd Memoh
docker compose up -d`,
  source: `git clone https://github.com/memohai/Memoh.git
cd Memoh
go mod download
go run cmd/memoh/main.go`
}

const copyCommand = (cmd: string) => {
  navigator.clipboard.writeText(cmd)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
    <div class="container mx-auto px-4 py-16 max-w-4xl">
      <!-- Header / Hero -->
      <div class="text-center mb-16 animate-fade-in-up">
        <div class="flex justify-center mb-6">
          <img src="/logo.png" alt="Memoh Logo" class="h-24 w-24 object-contain animate-float" />
        </div>
        <h1 class="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-purple-600">
          Memoh
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Multi-Member, Structured Long-Memory, Containerized AI Agent System
        </p>
      </div>

      <!-- Links -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up mb-16" style="animation-delay: 200ms;">
        <a href="https://github.com/memohai/Memoh" target="_blank" class="flex items-center justify-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 group">
          <font-awesome-icon :icon="['fab', 'github']" class="text-2xl text-gray-700 group-hover:text-black transition-colors" />
          <span class="font-medium text-gray-700 group-hover:text-gray-900">GitHub</span>
        </a>
        
        <a href="https://docs.memoh.ai" target="_blank" class="flex items-center justify-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 group">
          <font-awesome-icon icon="book" class="text-2xl text-blue-500 group-hover:text-blue-600 transition-colors" />
          <span class="font-medium text-gray-700 group-hover:text-gray-900">Documentation</span>
        </a>

        <a href="#" class="flex items-center justify-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 hover:-translate-y-1 transition-all duration-300 group">
          <font-awesome-icon :icon="['fab', 'telegram']" class="text-2xl text-sky-500 group-hover:text-sky-600 transition-colors" />
          <span class="font-medium text-gray-700 group-hover:text-gray-900">Telegram Channel</span>
        </a>
      </div>

      <!-- Quick Start -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-16 border border-gray-100 animate-fade-in-up" style="animation-delay: 400ms;">
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-700">Quick Start</h2>
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
        <div class="p-6 bg-[#1e1e1e] group relative min-h-[140px]">
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

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up" style="animation-delay: 600ms;">
        <div v-for="feature in features" :key="feature.title" class="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div class="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
            <font-awesome-icon :icon="feature.icon" class="text-xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
      
      <footer class="mt-16 text-center text-gray-400 text-sm animate-fade-in" style="animation-delay: 800ms;">
        <p>&copy; {{ new Date().getFullYear() }} Memoh. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for code block */
pre::-webkit-scrollbar {
  height: 8px;
}
pre::-webkit-scrollbar-track {
  background: #1e1e1e;
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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out backwards;
}

.animate-fade-in {
  animation: fadeInUp 0.8s ease-out backwards; /* Reusing fadeInUp for simplicity but with same effect as fade in if translateY is small */
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

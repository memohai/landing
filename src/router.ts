import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./pages/HomePage.vue')
const DesktopPage = () => import('./pages/DesktopPage.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/desktop', name: 'desktop', component: DesktopPage },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./pages/HomePage.vue')
const DownloadPage = () => import('./pages/DownloadPage.vue')
const BlogsPage = () => import('./pages/BlogsPage.vue')
const PricingPage = () => import('./pages/PricingPage.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/download', name: 'download', component: DownloadPage },
    { path: '/pricing', name: 'pricing', component: PricingPage },
    { path: '/blogs', name: 'blogs', component: BlogsPage },
    { path: '/blogs/:slug', name: 'blog-post', component: BlogsPage },
    // /desktop has been merged into /download; keep a redirect for old links.
    { path: '/desktop', redirect: '/download' },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

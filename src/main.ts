import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { i18n } from './i18n'
import { router } from './router'
import { createHead } from '@unhead/vue/client'

const app = createApp(App)
const head = createHead()

app.use(i18n)
app.use(router)
app.use(head)

// Mount only after the initial route is resolved. Otherwise the first render
// runs against vue-router's transient START_LOCATION ('/'), which makes the
// "home is always dark" watchEffect fire on non-home loads and clobber the
// user's persisted color-scheme back to dark.
router.isReady().then(() => app.mount('#app'))

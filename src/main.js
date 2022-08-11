import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import '@/assets/css/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
router.isReady().then(() => app.mount('#app'))


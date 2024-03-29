import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css' // Bootstrap Icons
import './assets/main.css' // Custom CSS
import './assets/custom.scss' // Custom Theme

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// Pinia to store data
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Router for clean routes
import router from './router'
app.use(router)

app.mount('#app')

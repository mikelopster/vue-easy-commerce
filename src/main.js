import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import './style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(VueApexCharts)
app.use(pinia)

app.mount('#app')

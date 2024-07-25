import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/miningcore.css'
import './assets/css/miningcore-colors.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App).use(router).mount('#app')

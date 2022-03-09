import { createApp, provide } from "vue";
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import messaging from './firebase'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// add FCM as a global
// console.log("messaging", messaging);
app.config.globalProperties.messaging = messaging;
app.use(router)
app.mount('#app')

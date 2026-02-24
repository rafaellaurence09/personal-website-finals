import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import './assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: HomeView }],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0 }
  },
})

createApp(App).use(router).mount('#app')
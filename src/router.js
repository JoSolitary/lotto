import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/AboutView.vue')
    },
    {
      path: '/lotto',
      name: 'new lotto',
      component: () => import('./views/NewLotto.vue')
    },
    {
      path: '/lotto/:id',
      name: 'lotto',
      component: () => import('./views/LottoView.vue')
    }
  ]
})

export default router

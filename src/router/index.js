import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter ({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mask',
      component: () => import('../views/Mask.vue')
    }
  ]
})

export default router
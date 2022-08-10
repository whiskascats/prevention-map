import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter ({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mask',
      component: () => import('../views/Mask.vue'),
    },
    {
      path: '/quick',
      name: 'quick',
      component: () => import('../views/Quick.vue'),
    },
  ]
})

export default router
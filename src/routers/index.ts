import { createRouter, createWebHistory } from 'vue-router'
import routers from './router'

const router = createRouter({
  history: createWebHistory(),
  routes: routers
})
// 可以进行路由守卫
export default router

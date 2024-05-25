import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import PerformView from '../views/PerformView.vue'
import PayableView from '@/views/PayableView.vue'
import ListPayables from '@/views/ListPayables.vue'
// Could not find a declaration file for module '@/views/ListPayables.vue'. '/home/rickymal/Ubuntu Workspace/aprove-me/frontend-vue/src/views/ListPayables.vue' implicitly has an 'any' type.ts(7016)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      redirect : '/login'
    },
    {
      path: '/perform',
      name: 'perform',
      component: PerformView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/payableform',
      name: 'payable-form',
      component: PayableView
    },
    {
      path: '/listpayable',
      name: 'listpayable',
      component: ListPayables
    },
  ]
})

export default router
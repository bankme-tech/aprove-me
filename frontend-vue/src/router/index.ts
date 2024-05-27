import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import PayableView from '@/views/PayableView.vue';
import ListPayables from '@/views/ListPayables.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => ({ path: '/login', query: { next: '/payableform', message: "" } }) // Define redirect with next parameter
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      props: (route) => ({ next: route.query.next }) // Pass the next query parameter as a prop to the LoginView
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
});

export default router;

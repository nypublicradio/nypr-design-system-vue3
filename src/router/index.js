import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../components/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [{
            path: '/personal',
            component: () => import('../components/menu/PersonalDemo.vue')
        },
        {
            path: '/seat',
            component: () => import('../components/menu/SeatDemo.vue')
        },
        {
            path: '/payment',
            component: () => import('../components/menu/PaymentDemo.vue')
        },
        {
            path: '/confirmation',
            component: () => import('../components/menu/ConfirmationDemo.vue')
        }]
    },
    {
        path: '/documentation',
        name: 'documentation',
        component: () => import('../components/Documentation.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
  
export default router;
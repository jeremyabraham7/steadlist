import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/pages/home.page.vue'),
            meta: {
                // layout: 'home'
            },
        },
        {
            path: '/top',
            name: 'top',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/components/pages/top.page.vue')
        },
        {
            path: '/new',
            name: 'new',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/components/pages/new.page.vue')
        },


        {
            path: '/create',
            name: 'create',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/components/pages/create.page.vue')
        },


        // Authentication Routes
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/components/pages/login.page.vue')
        },
        {
            path: '/register',
            name: 'register',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/components/pages/register.page.vue')
        },
        {
            path: '/forgot',
            name: 'forgot',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/components/pages/forgot.page.vue')
        },
    ]
})

export default router

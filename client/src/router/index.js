import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import $axios from '@/plugins/axios';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('@/views/pages/HomeView.vue'),
			meta: { requiresAuth: true }
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('@/views/pages/AboutView.vue'),
			meta: { requiresAuth: true }
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('@/views/auth/LoginView.vue'),
		},
	],
});

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();

    try {
        const res = await $axios.get('/auth/user');
        auth.user = res.data.user;

        if (res.data.status === 'success') {
            if (to.path === '/login') {
                return next('/');
            }
        }
        
        if (to.meta.requiresAuth) {
            return next();
        }
    } catch {
        auth.user = null;
        auth.token = null;
        if (to.meta.requiresAuth) {
            return next({ path: '/login', replace: true });
        }
    }

    next();
});

export default router

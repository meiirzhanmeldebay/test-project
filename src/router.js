import { createWebHistory, createMemoryHistory, createRouter } from 'vue-router'
import { useAuthStore } from './store/auth';

import SignUpView from './pages/sign-up.vue'
import SignInView from './pages/signin.vue'
import FeedView from './pages/feed.vue'
import FeedInsideView from './pages/feed-inside.vue'
import ContentView from './pages/content.vue'
import ProfileView from './pages/profile.vue'

const routes = [
  { path: '/', component: FeedView, meta: { requiresGuest: true }},
  { path: '/sign-in', component: SignInView, meta: { requiresGuest: true }},
  { path: '/sign-up', component: SignUpView, meta: { requiresGuest: true }},
  { path: '/feed', component: FeedView },
  { path: '/feed/:id', name: 'FeedInside',component: FeedInsideView },
  { path: '/content', component: ContentView },
  { path: '/content/:id', name: 'FeedInside',component: FeedInsideView },
  { path: '/profile', component : ProfileView, meta: { requiresAuth: true },}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass : 'active'
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthorized) {
    next('/sign-in'); // Redirect to sign-in page if not authenticated and accessing a protected route
  } else if (to.meta.requiresGuest && authStore.isAuthorized) {
    next('/profile'); // Redirect to profile page if authenticated and trying to access sign-in or sign-up page
  } else {
    next(); // Continue navigation
  }
});

export default router;

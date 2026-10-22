import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from "./authGuard";
import RootView from "../views/RootView.vue";
import { authRoutes } from '@/features/auth/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/", 
      name: "home", 
      component: RootView, 
      meta: { public: true } 
    },
    ...homeRoutes,
    ...authRoutes,
  ],
})

router.beforeEach(authGuard);

export default router

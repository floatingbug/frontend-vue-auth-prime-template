import { useAuthStore } from "@/features/auth/store/useAuthStore";

// Routes are protected by default. Public routes opt out with meta: { public: true }.
// A forgotten flag therefore fails closed (route stays protected), not open.
export function authGuard(to) {
  const authStore = useAuthStore();

  if (!to.meta.public && !authStore.isAuthenticated) {
    return { name: "sign-in", query: { redirect: to.fullPath } };
  }

  // Signed-in users do not need the sign-in page.
  if (to.name === "sign-in" && authStore.isAuthenticated) {
    return { name: "home" };
  }
}

import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { clearSession } from "./actions/clearSession";
import { refresh } from "./actions/refresh";
import { restoreSession } from "./actions/restoreSession";
import { signIn } from "./actions/signIn";
import { signOut } from "./actions/signOut";

export const useAuthStore = defineStore("auth", () => {
  // The access token lives in memory only. Never persist it (no localStorage).
  const accessToken = ref("");
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => Boolean(accessToken.value));

  return {
    accessToken,
    user,
    loading,
    error,
    isAuthenticated,
    signIn: (credentials) => signIn(useAuthStore(), credentials),
    signOut: () => signOut(useAuthStore()),
    refresh: () => refresh(useAuthStore()),
    restoreSession: () => restoreSession(useAuthStore()),
    clearSession: () => clearSession(useAuthStore()),
  };
});

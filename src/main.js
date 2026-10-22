import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";

import App from "./App.vue";
import router from "./app/router";
import { appConfig } from "@/app/config/config.js";
import { configureAuthHooks } from "@/shared/api/http-client";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

import "@/shared/styles/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
  license: appConfig.primeVueLicense,
});

// Pinia must be installed before any store is used.
const authStore = useAuthStore(pinia);

configureAuthHooks({
  getAccessToken: () => authStore.accessToken,
  refreshSession: () => authStore.refresh(),
  onSessionExpired: () => {
    authStore.clearSession();
    router.push({ name: "sign-in" });
  },
});

// Restore the session first, then install the router.
// The router starts its initial navigation when it is installed, so the
// route guard already knows whether the user is logged in.
// restoreSession() must never reject: on failure it just stays logged out.
authStore.restoreSession().finally(() => {
  app.use(router);
  app.mount("#app");
});

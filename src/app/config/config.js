export const appConfig = Object.freeze({
  /*
   * expose .env varialbes
  */
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME ?? "App name",
  primeVueLicense: import.meta.env.VITE_PRIME_VUE_LICENSE,
});

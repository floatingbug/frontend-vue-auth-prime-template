// Back to the initial state, e.g. when a registration page is opened.
export function resetRegistration(store) {
  store.loading = false;
  store.error = null;
  store.completed = false;
  store.verified = false;
  store.email = "";
  store.resent = false;
}

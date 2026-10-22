// Back to the initial state, e.g. when a password page is opened.
export function clearPasswordFlow(store) {
  store.loading = false;
  store.error = null;
  store.requested = false;
  store.email = "";
  store.completed = false;
}

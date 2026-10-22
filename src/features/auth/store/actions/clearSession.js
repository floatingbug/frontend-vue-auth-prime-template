// Ends the local session. Does not call the backend.
export function clearSession(store) {
  store.accessToken = "";
  store.user = null;
}

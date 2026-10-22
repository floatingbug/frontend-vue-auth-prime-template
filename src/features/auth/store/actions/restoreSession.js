import { clearSession } from "./clearSession";
import { refresh } from "./refresh";

// Runs once at app start. After a page reload the access token is gone,
// so ask the backend for a new one. Never throws: no valid session
// simply means the user stays signed out.
export async function restoreSession(store) {
  try {
    await refresh(store);
  }
  catch {
    clearSession(store);
  }
}

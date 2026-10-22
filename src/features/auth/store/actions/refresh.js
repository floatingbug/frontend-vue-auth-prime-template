import { authService } from "../../services/authService";

// Gets a new access token using the refresh-token cookie.
// Intentionally throws on failure: the http client relies on that
// to end the session (see configureAuthHooks in src/main.js).
export async function refresh(store) {
  const { accessToken, user } = await authService.refresh();

  store.accessToken = accessToken;
  if (user) {
    store.user = user;
  }
}

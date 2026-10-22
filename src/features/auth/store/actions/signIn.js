import { toApiError } from "@/shared/api/toApiError";
import { authService } from "../../services/authService";

export async function signIn(store, credentials) {
  store.loading = true;
  store.error = null;

  try {
    const { accessToken, user } = await authService.signIn(credentials);
    store.accessToken = accessToken;
    store.user = user;
  }
  catch (err) {
    store.error = toApiError(err);
  }
  finally {
    store.loading = false;
  }
}

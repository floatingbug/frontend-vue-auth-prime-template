import { toApiError } from "@/shared/api/toApiError";
import { passwordService } from "../../services/passwordService";

export async function requestPasswordReset(store, email) {
  store.loading = true;
  store.error = null;

  try {
    const result = await passwordService.requestReset({ email });
    store.email = result.email;
    store.requested = true;
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.loading = false;
  }
}

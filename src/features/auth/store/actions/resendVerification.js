import { toApiError } from "@/shared/api/toApiError";
import { registrationService } from "../../services/registrationService";

export async function resendVerification(store, email) {
  store.loading = true;
  store.error = null;
  store.resent = false;

  try {
    const result = await registrationService.resendVerification({ email });
    store.email = result.email;
    store.resent = true;
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.loading = false;
  }
}

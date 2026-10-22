import { toApiError } from "@/shared/api/toApiError";
import { registrationService } from "../../services/registrationService";

export async function verifyEmail(store, token) {
  store.loading = true;
  store.error = null;
  store.verified = false;

  try {
    await registrationService.verifyEmail({ token });
    store.verified = true;
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.loading = false;
  }
}

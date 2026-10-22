import { toApiError } from "@/shared/api/toApiError";
import { registrationService } from "../../services/registrationService";

export async function signUp(store, data) {
  store.loading = true;
  store.error = null;

  try {
    const { email } = await registrationService.signUp(data);
    store.email = email;
    store.resent = false;
    store.completed = true;
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.loading = false;
  }
}

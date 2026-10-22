import { toApiError } from "@/shared/api/toApiError";
import { passwordService } from "../../services/passwordService";

export async function resetPassword(store, data) {
  store.loading = true;
  store.error = null;

  try {
    await passwordService.resetPassword(data);
    store.completed = true;
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.loading = false;
  }
}

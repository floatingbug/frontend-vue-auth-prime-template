import { toApiError } from "@/shared/api/toApiError";
import { exampleService } from "../../services/exampleService";

export async function removeItem(store, item) {
  store.saving = true;
  store.error = null;

  try {
    await exampleService.removeItem(item.id);
    store.items = store.items.filter((entry) => entry.id !== item.id);
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.saving = false;
  }
}

import { toApiError } from "@/shared/api/toApiError";
import { exampleService } from "../../services/exampleService";

export async function toggleItem(store, item) {
  store.saving = true;
  store.error = null;

  try {
    const updated = await exampleService.updateItem(item.id, { done: !item.done });
    const index = store.items.findIndex((entry) => entry.id === updated.id);
    if (index !== -1) {
      store.items[index] = updated;
    }
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.saving = false;
  }
}

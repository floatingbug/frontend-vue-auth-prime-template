import { toApiError } from "@/shared/api/toApiError";
import { exampleService } from "../../services/exampleService";

export async function addItem(store, title) {
  store.saving = true;
  store.error = null;

  try {
    const created = await exampleService.addItem(title);
    store.items.push(created);
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.saving = false;
  }
}

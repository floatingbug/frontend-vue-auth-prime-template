import { toApiError } from "@/shared/api/toApiError";
import { exampleService } from "../../services/exampleService";

export async function loadItems(store) {
  store.loading = true;
  store.error = null;

  try {
    store.items = await exampleService.getItems();
  } catch (err) {
    store.error = toApiError(err);
  } finally {
    store.loading = false;
  }
}

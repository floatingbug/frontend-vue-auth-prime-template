import { exampleService } from "../../services/exampleService";

export async function loadItems(state) {
  state.loading.value = true;
  state.error.value = null;


  try {
    state.items.value = await exampleService.getItems();
  }
  catch (err) {
    state.error.value = err;
  }
  finally {
    state.loading.value = false;
  }
}

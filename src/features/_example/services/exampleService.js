import { exampleApi } from "../api/exampleApi";

// Business logic lives here: validation, mapping, rules.
// No direct HTTP (use the api layer) and no Vue components.
// The store calls this service, never the api layer directly.

function validateTitle(title) {
  const trimmed = String(title ?? "").trim();
  if (!trimmed) {
    throw new Error("Title must not be empty");
  }
  return trimmed;
}

export const exampleService = {
  getItems() {
    return exampleApi.getItems();
  },

  addItem(title) {
    return exampleApi.createItem({ title: validateTitle(title), done: false });
  },

  updateItem(id, changes) {
    const payload = { ...changes };
    if ("title" in payload) {
      payload.title = validateTitle(payload.title);
    }
    return exampleApi.updateItem(id, payload);
  },

  removeItem(id) {
    return exampleApi.deleteItem(id);
  },
};

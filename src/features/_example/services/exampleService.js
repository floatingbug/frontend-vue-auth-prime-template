import { exampleApi } from "../api/exampleApi";

// Business logic lives here: validation, mapping, rules.
// No direct HTTP (use the api layer) and no Vue components.
// The store calls this service, never the api layer directly.

// MongoDB documents use `_id`; the UI works with `id`.
function toItem(raw) {
  return { ...raw, id: raw.id ?? raw._id };
}

function validateTitle(title) {
  const trimmed = String(title ?? "").trim();
  if (!trimmed) {
    throw new Error("Title must not be empty");
  }
  return trimmed;
}

export const exampleService = {
  async getItems() {
    const items = await exampleApi.getItems();
    return items.map(toItem);
  },

  async addItem(title) {
    const created = await exampleApi.createItem({
      title: validateTitle(title),
      done: false,
    });
    return toItem(created);
  },

  async updateItem(id, changes) {
    const payload = { ...changes };
    if ("title" in payload) {
      payload.title = validateTitle(payload.title);
    }
    return toItem(await exampleApi.updateItem(id, payload));
  },

  removeItem(id) {
    return exampleApi.deleteItem(id);
  },
};

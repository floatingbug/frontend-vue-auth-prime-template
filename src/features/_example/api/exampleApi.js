import { http } from "@/shared/api/http-client";

// Only HTTP calls live here. No business logic, no store access.
// Always go through the shared http client, never call fetch/axios directly.
// axios wraps the payload in a response object, so unwrap `.data` here.
const BASE_PATH = "/items";

export const exampleApi = {
  getItems: async () => (await http.get(BASE_PATH)).data,
  createItem: async (payload) => (await http.post(BASE_PATH, payload)).data,
  updateItem: async (id, payload) =>
    (await http.put(`${BASE_PATH}/${id}`, payload)).data,
  deleteItem: async (id) => (await http.delete(`${BASE_PATH}/${id}`)).data,
};

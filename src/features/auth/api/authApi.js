import { http } from "@/shared/api/http-client";

// Only HTTP calls live here. Paths and field names mirror the backend.
export const authApi = {
  signIn: async ({ nameOrEmail, password }) =>
    (await http.post("/auth/sign-in", { nameOrEmail, password })).data,

  signOut: async () => (await http.post("/auth/sign-out")).data,

  // The refresh token is an httpOnly cookie; the browser sends it automatically.
  refresh: async () => (await http.post("/auth/refresh")).data,
};

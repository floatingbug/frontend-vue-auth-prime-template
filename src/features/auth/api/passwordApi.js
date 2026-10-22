import { http } from "@/shared/api/http-client";

// Only HTTP calls live here. Paths and field names mirror the backend.
export const passwordApi = {
  forgotPassword: async ({ email }) =>
    (await http.post("/auth/forgot-password", { email })).data,

  resetPassword: async ({ token, password }) =>
    (await http.post("/auth/reset-password", { token, password })).data,
};

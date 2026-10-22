import { http } from "@/shared/api/http-client";

// Only HTTP calls live here. Paths and field names mirror the backend.
export const registrationApi = {
  signUp: async ({ name, email, password }) =>
    (await http.post("/auth/sign-up", { name, email, password })).data,

  verifyEmail: async ({ token }) =>
    (await http.get("/auth/verify-email", { params: { token } })).data,

  resendVerification: async ({ email }) =>
    (await http.post("/auth/verify-email/resend", { email })).data,
};

import { authApi } from "../api/authApi";

function validateCredentials({ nameOrEmail, password }) {
  const identifier = String(nameOrEmail ?? "").trim();

  if (!identifier) {
    throw new Error("Please enter your name or e-mail");
  }
  if (!password) {
    throw new Error("Please enter your password");
  }

  return { nameOrEmail: identifier, password };
}

export const authService = {
  signIn(credentials) {
    return authApi.signIn(validateCredentials(credentials));
  },

  signOut() {
    return authApi.signOut();
  },

  refresh() {
    return authApi.refresh();
  },
};

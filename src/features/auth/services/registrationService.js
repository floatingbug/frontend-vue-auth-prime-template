import { registrationApi } from "../api/registrationApi";
import { validateEmail, validateNewPassword } from "./validation";

function validateSignUp({ name, email, password, confirmPassword }) {
  const trimmedName = String(name ?? "").trim();

  if (!trimmedName) {
    throw new Error("Please enter a name");
  }
  // The backend treats a sign-in identifier containing "@" as an e-mail address,
  // so a name with "@" could never sign in.
  if (trimmedName.includes("@")) {
    throw new Error("The name must not contain @");
  }

  return {
    name: trimmedName,
    email: validateEmail(email),
    password: validateNewPassword(password, confirmPassword),
  };
}

export const registrationService = {
  // Returns the e-mail the verification link was sent to.
  async signUp(data) {
    const payload = validateSignUp(data);
    await registrationApi.signUp(payload);
    return { email: payload.email };
  },

  async verifyEmail({ token }) {
    if (!String(token ?? "").trim()) {
      throw new Error("The verification link is invalid");
    }
    await registrationApi.verifyEmail({ token });
  },

  async resendVerification({ email }) {
    const validEmail = validateEmail(email);
    await registrationApi.resendVerification({ email: validEmail });
    return { email: validEmail };
  },
};

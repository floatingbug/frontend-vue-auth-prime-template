import { passwordApi } from "../api/passwordApi";
import { validateEmail, validateNewPassword } from "./validation";

export const passwordService = {
  // The backend answers the same way whether the address exists or not.
  async requestReset({ email }) {
    const validEmail = validateEmail(email);
    await passwordApi.forgotPassword({ email: validEmail });
    return { email: validEmail };
  },

  async resetPassword({ token, password, confirmPassword }) {
    if (!String(token ?? "").trim()) {
      throw new Error("The reset link is invalid");
    }
    const validPassword = validateNewPassword(password, confirmPassword);
    await passwordApi.resetPassword({ token, password: validPassword });
  },
};

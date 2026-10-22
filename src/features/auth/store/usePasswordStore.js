import { defineStore } from "pinia";
import { ref } from "vue";

import { clearPasswordFlow } from "./actions/clearPasswordFlow";
import { requestPasswordReset } from "./actions/requestPasswordReset";
import { resetPassword } from "./actions/resetPassword";

// Own store for "forgot password" and "reset password".
export const usePasswordStore = defineStore("password", () => {
  const loading = ref(false);
  const error = ref(null);
  const requested = ref(false); // reset link was requested
  const email = ref(""); // address the link was requested for
  const completed = ref(false); // new password was saved

  return {
    loading,
    error,
    requested,
    email,
    completed,
    requestReset: (address) => requestPasswordReset(usePasswordStore(), address),
    resetPassword: (data) => resetPassword(usePasswordStore(), data),
    clear: () => clearPasswordFlow(usePasswordStore()),
  };
});

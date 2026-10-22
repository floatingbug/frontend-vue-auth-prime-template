import { defineStore } from "pinia";
import { ref } from "vue";

import { resendVerification } from "./actions/resendVerification";
import { resetRegistration } from "./actions/resetRegistration";
import { signUp } from "./actions/signUp";
import { verifyEmail } from "./actions/verifyEmail";

// Own store for the registration flow (sign-up, e-mail verification),
// so its loading/error state never leaks into other forms.
export const useRegistrationStore = defineStore("registration", () => {
  const loading = ref(false);
  const error = ref(null);
  const completed = ref(false); // true after a successful sign-up
  const verified = ref(false); // true after the e-mail link was confirmed
  const email = ref(""); // address a verification link was sent to
  const resent = ref(false); // true after "resend" succeeded

  return {
    loading,
    error,
    completed,
    verified,
    email,
    resent,
    signUp: (data) => signUp(useRegistrationStore(), data),
    verifyEmail: (token) => verifyEmail(useRegistrationStore(), token),
    resendVerification: (address) =>
      resendVerification(useRegistrationStore(), address),
    reset: () => resetRegistration(useRegistrationStore()),
  };
});

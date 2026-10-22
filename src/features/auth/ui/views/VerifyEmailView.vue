<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";

import AuthLayout from "../components/AuthLayout.vue";
import EmailForm from "../components/EmailForm.vue";
import { useRegistrationStore } from "../../store/useRegistrationStore";

// Landing page of the link in the verification e-mail: /verify-email?token=...
const store = useRegistrationStore();
const route = useRoute();

// "pending" | "verified" | "failed"
const status = ref("pending");
const resendEmail = ref("");

onMounted(async () => {
  store.reset();
  await store.verifyEmail(String(route.query.token ?? ""));
  status.value = store.verified ? "verified" : "failed";
});

function onResend() {
  store.resendVerification(resendEmail.value);
}
</script>

<template>
  <AuthLayout title="Verify e-mail">
    <ProgressSpinner v-if="status === 'pending'" aria-label="Verifying e-mail address" />

    <Message v-else-if="status === 'verified'" severity="success">
      Your e-mail address is verified. You can sign in now.
    </Message>

    <template v-else>
      <Message v-if="store.error" severity="error">
        {{ store.error.message }}
      </Message>

      <Message v-if="store.resent" severity="info">
        A new verification e-mail has been requested.
      </Message>

      <p class="verify-email-view__hint">
        Enter your e-mail address to receive a new verification link.
      </p>

      <EmailForm
        v-model="resendEmail"
        submit-label="Send new link"
        :loading="store.loading"
        @submit="onResend"
      />
    </template>

    <template #footer>
      <RouterLink :to="{ name: 'sign-in' }">Go to sign in</RouterLink>
    </template>
  </AuthLayout>
</template>

<style scoped>
.verify-email-view__hint {
  margin: 0;
}
</style>

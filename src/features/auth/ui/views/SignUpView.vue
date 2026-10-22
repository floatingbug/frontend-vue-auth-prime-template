<script setup>
import { onMounted, reactive } from "vue";
import Button from "primevue/button";
import Message from "primevue/message";

import AuthLayout from "../components/AuthLayout.vue";
import SignUpForm from "../components/SignUpForm.vue";
import { useRegistrationStore } from "../../store/useRegistrationStore";

// The view talks to the store only. Always access state via `store.<name>`.
const store = useRegistrationStore();

const form = reactive({ name: "", email: "", password: "", confirmPassword: "" });

// Start with a clean state each time the page is opened.
onMounted(() => {
  store.reset();
});

function onSubmit() {
  store.signUp(form);
}
</script>

<template>
  <AuthLayout title="Create account">
    <Message v-if="store.error" severity="error">
      {{ store.error.message }}
    </Message>

    <template v-if="store.completed">
      <Message severity="success">
        We sent a verification link to {{ store.email }}. Please confirm your e-mail
        address before you sign in.
      </Message>

      <Message v-if="store.resent" severity="info">
        A new verification e-mail has been requested.
      </Message>

      <Button
        label="Resend e-mail"
        severity="secondary"
        :loading="store.loading"
        @click="store.resendVerification(store.email)"
      />
    </template>

    <SignUpForm
      v-else
      v-model:name="form.name"
      v-model:email="form.email"
      v-model:password="form.password"
      v-model:confirm-password="form.confirmPassword"
      :loading="store.loading"
      @submit="onSubmit"
    />

    <template #footer>
      <p class="sign-up-view__footer">
        Already have an account?
        <RouterLink :to="{ name: 'sign-in' }">Sign in</RouterLink>
      </p>
    </template>
  </AuthLayout>
</template>

<style scoped>
.sign-up-view__footer {
  margin: 0;
}
</style>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Message from "primevue/message";

import AuthLayout from "../components/AuthLayout.vue";
import ResetPasswordForm from "../components/ResetPasswordForm.vue";
import { usePasswordStore } from "../../store/usePasswordStore";

// Landing page of the link in the reset e-mail: /reset-password?token=...
const store = usePasswordStore();
const route = useRoute();
const router = useRouter();

// Read the token once, before it is removed from the address bar.
const token = String(route.query.token ?? "");

const form = reactive({ password: "", confirmPassword: "" });

onMounted(() => {
  store.clear();
  // Keep the token out of the address bar, history and referrer headers.
  router.replace({ query: {} });
});

function onSubmit() {
  store.resetPassword({ token, ...form });
}
</script>

<template>
  <AuthLayout title="Reset password">
    <Message v-if="!token" severity="error">
      This reset link is incomplete. Please request a new one.
    </Message>

    <Message v-if="store.error" severity="error">
      {{ store.error.message }}
    </Message>

    <Message v-if="store.completed" severity="success">
      Your password has been changed. You can sign in now.
    </Message>

    <ResetPasswordForm
      v-else-if="token"
      v-model:password="form.password"
      v-model:confirm-password="form.confirmPassword"
      :loading="store.loading"
      @submit="onSubmit"
    />

    <template #footer>
      <RouterLink v-if="!token" :to="{ name: 'forgot-password' }">
        Request a new link
      </RouterLink>
      <RouterLink v-else :to="{ name: 'sign-in' }">Go to sign in</RouterLink>
    </template>
  </AuthLayout>
</template>

<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import Message from "primevue/message";

import AuthLayout from "../components/AuthLayout.vue";
import SignInForm from "../components/SignInForm.vue";
import { useAuthStore } from "../../store/useAuthStore";

// The view talks to the store only. Always access state via `store.<name>`.
const store = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = reactive({ nameOrEmail: "", password: "" });

// Only allow redirects to paths inside the app (prevents open redirects).
function getRedirectTarget() {
  const target = route.query.redirect;
  const isInternalPath =
    typeof target === "string" && target.startsWith("/") && !target.startsWith("//");

  return isInternalPath ? target : { name: "home" };
}

async function onSubmit() {
  await store.signIn(form);

  if (!store.error) {
    router.push(getRedirectTarget());
  }
}
</script>

<template>
  <AuthLayout title="Sign in">
    <Message v-if="store.error" severity="error">
      {{ store.error.message }}
    </Message>

    <SignInForm
      v-model:name-or-email="form.nameOrEmail"
      v-model:password="form.password"
      :loading="store.loading"
      @submit="onSubmit"
    />

    <template #footer>
      <div class="sign-in-view__footer">
        <RouterLink :to="{ name: 'forgot-password' }">Forgot password?</RouterLink>
        <span>
          No account yet?
          <RouterLink :to="{ name: 'sign-up' }">Create one</RouterLink>
        </span>
      </div>
    </template>
  </AuthLayout>
</template>

<style scoped>
.sign-in-view__footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>

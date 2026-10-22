<script setup>
import { onMounted, ref } from "vue";
import Message from "primevue/message";

import AuthLayout from "../components/AuthLayout.vue";
import EmailForm from "../components/EmailForm.vue";
import { usePasswordStore } from "../../store/usePasswordStore";

const store = usePasswordStore();

const email = ref("");

onMounted(() => {
  store.clear();
});

function onSubmit() {
  store.requestReset(email.value);
}
</script>

<template>
  <AuthLayout title="Forgot password">
    <Message v-if="store.error" severity="error">
      {{ store.error.message }}
    </Message>

    <!-- The backend answers the same way whether the address exists or not,
         so the wording must not promise that an account exists. -->
    <Message v-if="store.requested" severity="success">
      If an account exists for {{ store.email }}, we sent a link to reset the password.
    </Message>

    <EmailForm
      v-else
      v-model="email"
      submit-label="Send reset link"
      :loading="store.loading"
      @submit="onSubmit"
    />

    <template #footer>
      <RouterLink :to="{ name: 'sign-in' }">Back to sign in</RouterLink>
    </template>
  </AuthLayout>
</template>

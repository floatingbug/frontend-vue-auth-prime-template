<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

// Presentational component: the parent owns the values (v-model) and
// decides what happens on submit.
const name = defineModel("name", { type: String, default: "" });
const email = defineModel("email", { type: String, default: "" });
const password = defineModel("password", { type: String, default: "" });
const confirmPassword = defineModel("confirmPassword", { type: String, default: "" });

defineProps({
  loading: { type: Boolean, default: false },
});

defineEmits(["submit"]);
</script>

<template>
  <form class="sign-up-form" @submit.prevent="$emit('submit')">
    <div class="sign-up-form__field">
      <label for="sign-up-name">Name</label>
      <InputText id="sign-up-name" v-model="name" autocomplete="username" fluid />
    </div>

    <div class="sign-up-form__field">
      <label for="sign-up-email">E-mail</label>
      <InputText
        id="sign-up-email"
        v-model="email"
        type="email"
        autocomplete="email"
        fluid
      />
    </div>

    <div class="sign-up-form__field">
      <label for="sign-up-password">Password</label>
      <Password
        v-model="password"
        input-id="sign-up-password"
        :feedback="false"
        toggle-mask
        fluid
      />
    </div>

    <div class="sign-up-form__field">
      <label for="sign-up-confirm-password">Confirm password</label>
      <Password
        v-model="confirmPassword"
        input-id="sign-up-confirm-password"
        :feedback="false"
        toggle-mask
        fluid
      />
    </div>

    <Button type="submit" label="Create account" :loading="loading" fluid />
  </form>
</template>

<style scoped>
.sign-up-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.sign-up-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sign-up-form__field label {
  font-weight: var(--font-weight-medium);
}
</style>

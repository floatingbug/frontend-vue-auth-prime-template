<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

// Presentational component: the parent owns the values (v-model) and
// decides what happens on submit.
const nameOrEmail = defineModel("nameOrEmail", { type: String, default: "" });
const password = defineModel("password", { type: String, default: "" });

defineProps({
  loading: { type: Boolean, default: false },
});

defineEmits(["submit"]);
</script>

<template>
  <form class="sign-in-form" @submit.prevent="$emit('submit')">
    <div class="sign-in-form__field">
      <label for="sign-in-name">Name or e-mail</label>
      <InputText
        id="sign-in-name"
        v-model="nameOrEmail"
        autocomplete="username"
        fluid
      />
    </div>

    <div class="sign-in-form__field">
      <label for="sign-in-password">Password</label>
      <Password
        v-model="password"
        input-id="sign-in-password"
        :feedback="false"
        toggle-mask
        fluid
      />
    </div>

    <Button type="submit" label="Sign in" :loading="loading" fluid />
  </form>
</template>

<style scoped>
.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.sign-in-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sign-in-form__field label {
  font-weight: var(--font-weight-medium);
}
</style>

<script setup>
import Button from "primevue/button";
import Password from "primevue/password";

// Presentational component: the parent owns the values (v-model)
// and decides what happens on submit.
const password = defineModel("password", { type: String, default: "" });
const confirmPassword = defineModel("confirmPassword", { type: String, default: "" });

defineProps({
  loading: { type: Boolean, default: false },
});

defineEmits(["submit"]);
</script>

<template>
  <form class="reset-password-form" @submit.prevent="$emit('submit')">
    <div class="reset-password-form__field">
      <label for="reset-password-new">New password</label>
      <Password
        v-model="password"
        input-id="reset-password-new"
        :feedback="false"
        toggle-mask
        fluid
      />
    </div>

    <div class="reset-password-form__field">
      <label for="reset-password-confirm">Confirm new password</label>
      <Password
        v-model="confirmPassword"
        input-id="reset-password-confirm"
        :feedback="false"
        toggle-mask
        fluid
      />
    </div>

    <Button type="submit" label="Reset password" :loading="loading" fluid />
  </form>
</template>

<style scoped>
.reset-password-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.reset-password-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.reset-password-form__field label {
  font-weight: var(--font-weight-medium);
}
</style>

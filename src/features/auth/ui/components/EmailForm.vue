<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

// Presentational component: a single e-mail field with a submit button.
// Used wherever only an address is needed (forgot password, resend link).
const email = defineModel({ type: String, default: "" });

defineProps({
  submitLabel: { type: String, default: "Submit" },
  loading: { type: Boolean, default: false },
});

defineEmits(["submit"]);
</script>

<template>
  <form class="email-form" @submit.prevent="$emit('submit')">
    <div class="email-form__field">
      <label for="email-form-input">E-mail</label>
      <InputText
        id="email-form-input"
        v-model="email"
        type="email"
        autocomplete="email"
        fluid
      />
    </div>

    <Button type="submit" :label="submitLabel" :loading="loading" fluid />
  </form>
</template>

<style scoped>
.email-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.email-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.email-form__field label {
  font-weight: var(--font-weight-medium);
}
</style>

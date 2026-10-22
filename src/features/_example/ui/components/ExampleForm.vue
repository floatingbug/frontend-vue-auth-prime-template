<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

// Presentational component: the parent owns the input value (v-model)
// and decides what happens on submit (e.g. clearing the input after success).
const title = defineModel({ type: String, default: "" });

defineProps({
  disabled: { type: Boolean, default: false },
});

defineEmits(["submit"]);
</script>

<template>
  <form class="example-form" @submit.prevent="$emit('submit')">
    <InputText v-model="title" placeholder="New item" aria-label="New item" />
    <Button type="submit" label="Add item" :disabled="disabled" />
  </form>
</template>

<style scoped>
.example-form {
  display: flex;
  gap: var(--space-2);
}

.example-form :deep(input) {
  flex: 1;
}
</style>

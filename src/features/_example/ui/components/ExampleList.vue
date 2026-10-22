<script setup>
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

// Presentational component: receives data via props, reports user actions via emits.
// It knows nothing about the store, services or the api layer.
defineProps({
  items: { type: Array, required: true },
});

defineEmits(["toggle", "remove"]);
</script>

<template>
  <ul class="example-list">
    <li v-for="item in items" :key="item.id" class="example-list__row">
      <Checkbox
        :model-value="item.done"
        :input-id="`example-item-${item.id}`"
        binary
        @update:model-value="$emit('toggle', item)"
      />
      <label
        :for="`example-item-${item.id}`"
        class="example-list__title"
        :class="{ 'example-list__title--done': item.done }"
      >
        {{ item.title }}
      </label>
      <Button
        icon="pi pi-trash"
        severity="danger"
        text
        rounded
        :aria-label="`Delete ${item.title}`"
        @click="$emit('remove', item)"
      />
    </li>
  </ul>
</template>

<style scoped>
.example-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.example-list__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
}

.example-list__title {
  flex: 1;
}

.example-list__title--done {
  text-decoration: line-through;
  opacity: var(--opacity-muted);
}
</style>

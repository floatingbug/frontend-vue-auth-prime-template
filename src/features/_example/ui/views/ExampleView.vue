<script setup>
import { onMounted, ref } from "vue";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";

import ExampleForm from "../components/ExampleForm.vue";
import ExampleList from "../components/ExampleList.vue";
import { useExampleStore } from "../../store/useExampleStore";

// The view talks to the store only. No api calls, no service calls here.
// Always access state via `store.<name>`; never destructure the store.
const store = useExampleStore();

const newTitle = ref("");

onMounted(() => {
  store.loadItems();
});

async function onAdd() {
  await store.addItem(newTitle.value);
  // Keep the input if the action failed, so the user can correct it.
  if (!store.error) {
    newTitle.value = "";
  }
}
</script>

<template>
  <section class="example-view">
    <h1>Items</h1>

    <ExampleForm v-model="newTitle" :disabled="store.loading" @submit="onAdd" />

    <!-- Every view covers four states: loading, error, empty, content. -->
    <ProgressSpinner v-if="store.loading" aria-label="Loading items" />

    <Message v-else-if="store.error" severity="error">
      {{ store.error.message }}
    </Message>

    <p v-else-if="store.items.length === 0">No items yet. Add your first item above.</p>

    <ExampleList
      v-else
      :items="store.items"
      @toggle="store.toggleItem"
      @remove="store.removeItem"
    />
  </section>
</template>

<style scoped>
.example-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: var(--content-width-narrow);
  margin: 0 auto;
  padding: var(--space-5);
}
</style>

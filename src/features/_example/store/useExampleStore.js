import { defineStore } from "pinia";
import { ref } from "vue";
import { loadItems } from "./actions/exampleAction";

export const useExampleStore = defineStore("example", () => {
  const items = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const state = { items, loading, error };

  return {
    items,
    loading,
    error,
    loadItems: () => loadItems(state),
  };
});

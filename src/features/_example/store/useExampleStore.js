import { defineStore } from "pinia";
import { ref } from "vue";

import { addItem } from "./actions/addItem";
import { loadItems } from "./actions/loadItems";
import { removeItem } from "./actions/removeItem";
import { toggleItem } from "./actions/toggleItem";

// Setup store: state is `ref`, actions are thin wrappers that pass the
// store instance to the action files in ./actions/.
export const useExampleStore = defineStore("example", () => {
  const items = ref([]);
  const loading = ref(false); // loading the list (view shows a spinner)
  const saving = ref(false); // add/toggle/remove in progress (list stays visible)
  const error = ref(null);

  return {
    items,
    loading,
    saving,
    error,
    loadItems: () => loadItems(useExampleStore()),
    addItem: (title) => addItem(useExampleStore(), title),
    toggleItem: (item) => toggleItem(useExampleStore(), item),
    removeItem: (item) => removeItem(useExampleStore(), item),
  };
});

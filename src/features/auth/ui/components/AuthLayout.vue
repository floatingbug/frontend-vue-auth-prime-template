<script setup>
import Card from "primevue/card";

// Shared shell of all public auth pages (sign-in, sign-up, forgot password, ...):
// a centered card with a title, the page content and an optional footer.
// Views put only their own content into the slots.
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <main class="auth-layout">
    <Card class="auth-layout__card">
      <template #title>
        <h1 class="auth-layout__title">{{ title }}</h1>
      </template>

      <template #content>
        <div class="auth-layout__content">
          <slot />
        </div>
      </template>

      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </Card>
  </main>
</template>

<style scoped>
.auth-layout {
  display: flex;
  justify-content: center;
  padding: var(--space-8) var(--space-4);
}

.auth-layout__card {
  width: 100%;
  max-width: var(--content-width-form);
}

.auth-layout__title {
  margin: 0;
  font-size: var(--font-size-xl);
}

.auth-layout__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>

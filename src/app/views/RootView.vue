<script setup>
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import HomeView from "@/features/home/ui/views/HomeView.vue";
// Replace with the component signed-in users should see on route "/":
import DashboardView from "@/features/dashboard/ui/views/DashboardView.vue";

const authStore = useAuthStore();
</script>

<template>
  <DashboardView v-if="authStore.isAuthenticated" />
  <HomeView v-else />
</template>

<template>
  <Navbar />

  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "@/components/Layout/Navbar.vue";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "@vue/runtime-core";

/**
 * store
 */
const authStore = useAuthStore();

/**
 * mounted
 */
onMounted(() => {
  authStore.init();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>

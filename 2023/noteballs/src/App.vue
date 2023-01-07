<template>
  <Navbar />

  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "@/components/Layout/Navbar.vue";
import { useNotesStore } from "@/stores/notes";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "@vue/runtime-core";

/**
 * store
 */
const notesStore = useNotesStore();
const authStore = useAuthStore();

/**
 * mounted
 */
onMounted(() => {
  notesStore.getNotesRealtime();
  authStore.init();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>

<template>
  <Navbar />

  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "@/components/Layout/Navbar.vue";
import { useNotesStore } from "@/stores/notes";
import { onMounted } from "@vue/runtime-core";

/**
 * store
 */
const notesStore = useNotesStore();

/**
 * mounted
 */
onMounted(() => {
  notesStore.getNotes();
});
</script>

<style>
@import "bulma/css/bulma.min.css";
</style>

<template>
  <div class="modals">
    <h1>Modal</h1>
    <button @click="showModal = true">Show Modal</button>

    <Modal v-if="showModal"></Modal>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Modal from "@/components/Modal.vue";

/**
 * Modals
 */
const showModal = ref(false);
</script>

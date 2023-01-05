<template>
  <div class="modals">
    <h1>Modal</h1>
    <button @click="showModal = true">Show Modal</button>

    <Modal v-if="showModal">
      <template #title>
        <h1>This is a modal</h1>
      </template>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem earum
        voluptatibus modi odit voluptatem eos quas aliquam a, perferendis ipsum
        odio amet ipsa temporibus veritatis, rem necessitatibus neque corrupti
        aspernatur!
      </p>
    </Modal>
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

<template>
  <Teleport to="body">
    <div class="modal">
      <h1>{{ title }}</h1>
      <slot />
      <button @click="handleButtonClick">Hide modal</button>

      <div>Username is: {{ userData.username }}</div>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * Props
 */

import { inject } from "@vue/runtime-core";

// const props = defineProps(["title"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

/**
 * Emits
 */
const emit = defineEmits(["hideModal"]);

/**
 * handle button click
 */
const handleButtonClick = () => {
  // this.$emit('hideModal')

  emit("hideModal");
};

/**
 * user data
 */
const userData = inject("userData");
</script>

<style scoped>
.modal {
  background: beige;
  padding: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>

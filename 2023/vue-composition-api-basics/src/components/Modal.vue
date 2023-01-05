<template>
  <Teleport to="body">
    <div class="modal">
      <slot name="title" />
      <slot />
      <button>Hide modal</button>

      <!-- <pre>{{ $slots.title() }}</pre> -->
    </div>
  </Teleport>
</template>

<script setup>
import { useSlots } from "vue";

const slots = useSlots();
// this.$slots.title();
slots.title();
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

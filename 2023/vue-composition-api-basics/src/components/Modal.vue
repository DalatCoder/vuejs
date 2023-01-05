<template>
  <Teleport to="body">
    <div class="modal">
      <h1>{{ title }}</h1>
      <slot />
      <button>Hide modal</button>
    </div>
  </Teleport>
</template>

<script setup>
/**
 * Props
 */
// const props = defineProps(["title"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

console.log(props.title);
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

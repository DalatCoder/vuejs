<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}

        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClicked"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";

/**
 * props
 */
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

/**
 * Emits
 */
const emit = defineEmits(["deleteClicked"]);

/**
 * Character length
 */
const characterLength = computed(() => {
  const length = props.note.content.length;
  if (length > 1) return `${length} characters`;
  return `${length} character`;
});

/**
 * Handle delete clicked
 */
const handleDeleteClicked = () => {
  emit("deleteClicked", props.note);
};
</script>

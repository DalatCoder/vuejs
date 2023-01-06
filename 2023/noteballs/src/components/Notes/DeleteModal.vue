<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          @click="handleOnCancelClicked"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="handleOnCancelClicked" class="button">Cancel</button>
        <button @click="handleOnSubmitClicked" class="button is-danger">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onClickOutside } from "@vueuse/core";

/**
 * events
 */
const emit = defineEmits(["onCancel", "onSubmit"]);

const handleOnCancelClicked = () => {
  emit("onCancel");
};

const handleOnSubmitClicked = () => {
  emit("onSubmit");
};

/**
 * click outside
 */
const modalCardRef = ref(null);
onClickOutside(modalCardRef, handleOnCancelClicked);
</script>

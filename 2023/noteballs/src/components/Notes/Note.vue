<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}

        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }}</small>
          <small class="column has-text-right">{{ characterLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/edit/${note.id}`" class="card-footer-item">
        Edit
      </router-link>
      <a href="#" class="card-footer-item" @click.prevent="handleDeleteClicked"
        >Delete</a
      >
    </footer>

    <DeleteModal
      v-if="modals.deleteNote"
      @onCancel="handleOnModalCancelClicked"
      @onSubmit="handleOnModalSubmitClicked"
    />
  </div>
</template>

<script setup>
import { computed, reactive } from "@vue/runtime-core";
import { useDateFormat } from "@vueuse/core";
import { useNotesStore } from "@/stores/notes";
import DeleteModal from "@/components/Notes/DeleteModal.vue";

/**
 * store
 */
const notesStore = useNotesStore();

/**
 * date formatted
 */
const dateFormatted = computed(() => {
  const date = new Date(+props.note.createdAt);
  return useDateFormat(date, "DD-MM-YYYY @ HH:mm:ss").value;
});

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
  modals.deleteNote = true;
};

/**
 * modals
 */
const modals = reactive({
  deleteNote: false,
  editNote: false,
});

const handleOnModalCancelClicked = () => {
  modals.deleteNote = false;
};

const handleOnModalSubmitClicked = () => {
  modals.deleteNote = false;
  notesStore.deleteNote(props.note);
};
</script>

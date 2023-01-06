<template>
  <div class="edit-note">
    <NoteForm
      v-model="noteContent"
      ref="noteFormRef"
      bgColor="link"
      placeholder="Edit note"
      label="Edit Note"
    >
      <template #buttons>
        <button @click="$router.back()" class="button is-link is-light mr-3">
          Cancel
        </button>

        <button
          class="button is-link has-background-link"
          :disabled="!noteContent"
          @click="handleSaveClicked"
        >
          Save Note
        </button>
      </template>
    </NoteForm>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { useNotesStore } from "@/stores/notes";

import NoteForm from "@/components/Notes/NoteForm.vue";

/**
 * Routes
 */
const route = useRoute();
const router = useRouter();

/**
 * Store
 */
const notesStore = useNotesStore();

const noteContent = ref("");
noteContent.value = notesStore.getNoteById(+route.params.id)?.content || "";

/**
 * Save clicked
 */
const handleSaveClicked = () => {
  notesStore.updateNote(+route.params.id, noteContent.value);
  router.push({
    name: "notes",
  });
};
</script>

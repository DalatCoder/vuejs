<template>
  <div class="notes">
    <NoteForm v-model="newNote" ref="noteFormRef">
      <template #buttons>
        <button @click="addNote" class="button is-link has-background-success">
          Add New Note
        </button>
      </template>
    </NoteForm>
    <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import Note from "@/components/Notes/Note.vue";
import NoteForm from "../components/Notes/NoteForm.vue";

import { useNotesStore } from "@/stores/notes";

/**
 * Store
 */
const notesStore = useNotesStore();

/**
 * Notes
 */
const newNote = ref("");
const noteFormRef = ref(null);

onMounted(() => {
  noteFormRef.value.focusTextarea();
});

const addNote = () => {
  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notesStore.addNote(note);

  newNote.value = "";
  noteFormRef.value.focusTextarea();
};
</script>

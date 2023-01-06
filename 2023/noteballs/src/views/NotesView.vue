<template>
  <div class="notes">
    <NoteForm v-model="newNote" ref="noteFormRef" placeholder="Add a new note">
      <template #buttons>
        <button
          @click="addNote"
          class="button is-link has-background-success"
          :disabled="!newNote"
        >
          Add New Note
        </button>
      </template>
    </NoteForm>
    <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

import Note from "@/components/Notes/Note.vue";
import NoteForm from "@/components/Notes/NoteForm.vue";

import { useNotesStore } from "@/stores/notes";
import { useWatchCharacters } from "@/use/useWatchCharacters";
import { onMounted, onUnmounted } from "@vue/runtime-core";

/**
 * Store
 */
const notesStore = useNotesStore();

/**
 * Notes
 */
const newNote = ref("");
const noteFormRef = ref(null);

const addNote = () => {
  if (!newNote.value.trim()) return;

  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notesStore.addNote(note);

  newNote.value = "";
  noteFormRef.value.focusTextarea();
};

/**
 * Watch
 */
useWatchCharacters(newNote);

/**
 * keyboard control
 */
const handleKeyControl = (event) => {
  if (event.key === "Enter") {
    addNote();
  }
};

onMounted(() => {
  document.addEventListener("keyup", handleKeyControl);
});

onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyControl);
});
</script>

<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            @click="addNote"
            :disabled="!newNote"
            class="button is-link has-background-success"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note v-for="note in notesStore.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import Note from "@/components/Notes/Note.vue";

import { useNotesStore } from "@/stores/notes";

/**
 * Store
 */
const notesStore = useNotesStore();

/**
 * Notes
 */
const newNote = ref("");
const newNoteRef = ref(null);

onMounted(() => {
  newNoteRef.value.focus();
});

const addNote = () => {
  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notesStore.addNote(note);

  newNote.value = "";
  newNoteRef.value.focus();
};
</script>

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

    <div v-for="note in notes" class="card mb-4" :key="note.id">
      <div class="card-content">
        <div class="content">{{ note.content }}</div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

/**
 * Notes
 */
const newNote = ref("");
const newNoteRef = ref(null);
const notes = ref([]);

onMounted(() => {
  newNoteRef.value.focus();
});

const addNote = () => {
  const note = {
    id: new Date().getTime(),
    content: newNote.value,
  };

  notes.value.unshift(note);

  newNote.value = "";
  newNoteRef.value.focus();
};
</script>

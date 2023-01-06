import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([
    {
      id: 1,
      content: "test",
    },
  ]);

  const addNote = (newNote) => {
    notes.value.unshift(newNote);
  };

  const deleteNote = (note) => {
    notes.value = notes.value.filter((n) => n.id !== note.id);
  };

  return {
    notes,
    addNote,
    deleteNote,
  };
});

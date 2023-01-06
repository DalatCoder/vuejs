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

  const getNoteById = (id) => {
    return notes.value.find((n) => n.id === id);
  };

  const updateNote = (id, content) => {
    notes.value = notes.value.map((n) => {
      if (n.id !== id) return n;
      return {
        ...n,
        content,
      };
    });
  };

  return {
    notes,
    addNote,
    deleteNote,
    getNoteById,
    updateNote,
  };
});

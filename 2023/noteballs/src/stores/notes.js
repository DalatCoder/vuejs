import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { db } from "@/js/firebase";

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

  const totalNotesCount = computed(() => notes.value.length);
  const totalCharactersCount = computed(() =>
    notes.value.reduce((acc, cur) => acc + cur.content.length, 0)
  );

  return {
    notes,
    addNote,
    deleteNote,
    getNoteById,
    updateNote,
    totalNotesCount,
    totalCharactersCount,
  };
});

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/js/firebase";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);

  const addNote = (newNote) => {
    notes.value.unshift(newNote);
  };

  const deleteNote = (note) => {
    notes.value = notes.value.filter((n) => n.id !== note.id);
  };

  const getNotes = async () => {
    const querySnapshot = await getDocs(collection(db, "notes"));

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        content: doc.data().content,
      });
    });

    notes.value = data;
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
    getNotes,
    deleteNote,
    getNoteById,
    updateNote,
    totalNotesCount,
    totalCharactersCount,
  };
});

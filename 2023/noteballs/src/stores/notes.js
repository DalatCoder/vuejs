import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { collection, getDocs, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/js/firebase";

const notesCollectionRef = collection(db, "notes");

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);

  const addNote = async (newNote) => {
    await addDoc(notesCollectionRef, {
      content: newNote.content,
      createdAt: new Date(),
    });
  };

  const deleteNote = (note) => {
    notes.value = notes.value.filter((n) => n.id !== note.id);
  };

  const getNotes = async () => {
    const querySnapshot = await getDocs(notesCollectionRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        content: doc.data().content,
      });
    });

    notes.value = data;
  };

  const getNotesRealtime = () => {
    const c = notesCollectionRef;

    const unsubscribe = onSnapshot(c, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          content: doc.data().content,
        });
      });

      notes.value = data;
    });

    // stop listening
    // unsubscribe()
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
    getNotesRealtime,
    deleteNote,
    getNoteById,
    updateNote,
    totalNotesCount,
    totalCharactersCount,
  };
});

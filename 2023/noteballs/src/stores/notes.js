import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/js/firebase";

const notesCollectionRef = collection(db, "notes");

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);

  const addNote = async (newNote) => {
    await addDoc(notesCollectionRef, {
      content: newNote.content,
      createdAt: new Date().getTime(),
    });
  };

  const deleteNote = async (note) => {
    await deleteDoc(doc(notesCollectionRef, note.id));
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
    const q = query(notesCollectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
    return notes.value.find((n) => n.id == id);
  };

  const updateNote = async (id, content) => {
    await updateDoc(doc(notesCollectionRef, id), {
      content,
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

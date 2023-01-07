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
  where,
} from "firebase/firestore";

import { db } from "@/js/firebase";

const notesCollectionRef = collection(db, "notes");
let userId = "";

export const useNotesStore = defineStore("notes", () => {
  const notes = ref([]);
  const notesLoaded = ref(false);

  const init = (user) => {
    userId = user.uid;
    getNotesRealtime();
  };

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
    notesLoaded.value = false;
    const querySnapshot = await getDocs(notesCollectionRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
      });
    });

    notes.value = data;
    notesLoaded.value = true;
  };

  const getNotesRealtime = () => {
    const w = where("userId", "==", userId);
    const q = query(notesCollectionRef, w, orderBy("createdAt", "desc"));
    notesLoaded.value = false;

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          content: doc.data().content,
          createdAt: doc.data().createdAt,
        });
      });

      notes.value = data;

      if (!notesLoaded.value) {
        notesLoaded.value = true;
      }
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
    notesLoaded,
    init,
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

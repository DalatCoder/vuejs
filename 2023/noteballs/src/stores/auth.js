import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/js/firebase";
import { ref } from "vue";

import router from "@/routers";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const init = () => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        user.value = {
          id: u.uid,
          email: u.email,
        };

        router.push({
          name: "notes",
        });
      } else {
        user.value = null;

        router.push({
          name: "auth",
        });
      }
    });
  };

  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  };

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return {
    user,
    init,
    registerUser,
    loginUser,
    logoutUser,
  };
});

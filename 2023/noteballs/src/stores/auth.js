import { defineStore } from "pinia";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/js/firebase";

export const useAuthStore = defineStore("auth", () => {
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

  return {
    registerUser,
  };
});

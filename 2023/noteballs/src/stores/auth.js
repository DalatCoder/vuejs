import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

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

  const logoutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return {
    registerUser,
    logoutUser,
  };
});

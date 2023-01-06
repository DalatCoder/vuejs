import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTFYx5Nydmjxed0hZNfslkXk76rlhJYfs",
  authDomain: "noteball-39431.firebaseapp.com",
  projectId: "noteball-39431",
  storageBucket: "noteball-39431.appspot.com",
  messagingSenderId: "959947377005",
  appId: "1:959947377005:web:734934078fd7a67329f264",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

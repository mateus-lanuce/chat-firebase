import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBf-FakaX7bZ7licFIDfRMd5F_doGxWNDQ",
  authDomain: "chat-efd82.firebaseapp.com",
  projectId: "chat-efd82",
  storageBucket: "chat-efd82.appspot.com",
  messagingSenderId: "464276815837",
  appId: "1:464276815837:web:c4262e19953ecdf9728034",
  measurementId: "G-W2QMMKJCEF"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);
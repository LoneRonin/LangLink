// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw0YZib5ajKEVuFY5roRyRvZoCUvaKQhc",
  authDomain: "langlink-f6e73.firebaseapp.com",
  databaseURL: "https://langlink-f6e73-default-rtdb.firebaseio.com",
  projectId: "langlink-f6e73",
  storageBucket: "langlink-f6e73.appspot.com",
  messagingSenderId: "562991364178",
  appId: "1:562991364178:web:7b6475d9534ab16067878b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
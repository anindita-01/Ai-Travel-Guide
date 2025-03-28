// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr7G_oDhf0Jn8N9yxOqD9J6VUj-ngVGqc",
  authDomain: "app-bbd9b.firebaseapp.com",
  databaseURL: "https://app-bbd9b-default-rtdb.firebaseio.com",
  projectId: "app-bbd9b",
  storageBucket: "app-bbd9b.firebasestorage.app",
  messagingSenderId: "270267065304",
  appId: "1:270267065304:web:f8a2fbe2ca5e49a64d08ad",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyDVycVU3tXB-Ylu0oDdUq-drZ28cHnTl-s",
    authDomain: "gwh24-2b2d2.firebaseapp.com",
    projectId: "gwh24-2b2d2",
    storageBucket: "gwh24-2b2d2.appspot.com",
    messagingSenderId: "552488008288",
    appId: "1:552488008288:web:bf4578e29c79e261f56105"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

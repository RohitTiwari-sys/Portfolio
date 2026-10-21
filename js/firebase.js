import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmg475QOvbrl-fJU04UsFAP-6ZaO9eofY",
  authDomain: "rohit-portfolio-c09bd.firebaseapp.com",
  projectId: "rohit-portfolio-c09bd",
  storageBucket: "rohit-portfolio-c09bd.firebasestorage.app",
  messagingSenderId: "1033083100064",
  appId: "1:1033083100064:web:6eb225a040a09b468aa2c5",
  measurementId: "G-0FLY8RXTGJ"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
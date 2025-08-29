// Importa Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Config do seu app (copiada do Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDOGokdBvZV-AbCgZ_HRhXnc5_WNOCmwHs",
  authDomain: "estudo-1-d002c.firebaseapp.com",
  projectId: "estudo-1-d002c",
  storageBucket: "estudo-1-d002c.firebasestorage.app",
  messagingSenderId: "822469617645",
  appId: "1:822469617645:web:b198cbb607fbf374dbe9e4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Authentication
export const auth = getAuth(app);

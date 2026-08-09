import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWBcZkm6XVp-UNCdjAFBIYDtTbbbLRB44",
  authDomain: "mobilityos-3c7e5.firebaseapp.com",
  projectId: "mobilityos-3c7e5",
  storageBucket: "mobilityos-3c7e5.firebasestorage.app",
  messagingSenderId: "887377458344",
  appId: "1:887377458344:web:d1e63cd991aa43a8b43e9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore so the rest of your app can use them
export const auth = getAuth(app);
export const db = getFirestore(app);
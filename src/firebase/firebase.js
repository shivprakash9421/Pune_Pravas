import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWBCZkm6XVp-UNCdjAFBIYDtTbbbLRB44",
  authDomain: "mobilityos-3c7e5.firebaseapp.com",
  projectId: "mobilityos-3c7e5",
  storageBucket: "mobilityos-3c7e5.firebasestorage.app",
  messagingSenderId: "887377458344",
  appId: "1:887377458344:web:d1e63cd991aa43a8b43e9d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
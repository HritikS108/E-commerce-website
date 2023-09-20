// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCpd9fAwpgjdZ4AO_YYZAmQ3CEQdNQa1H8",
  authDomain: "crwn-clothing-bd414.firebaseapp.com",
  projectId: "crwn-clothing-bd414",
  storageBucket: "crwn-clothing-bd414.appspot.com",
  messagingSenderId: "701971651344",
  appId: "1:701971651344:web:90beeea435889cd21b6395",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
export const RegisterWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

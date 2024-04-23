// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getAuth} from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD82Q1nvCnHaHv84myepxV3Nl_MELCqIak",
  authDomain: "actia-labstockpro.firebaseapp.com",
  databaseURL: "https://actia-labstockpro-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "actia-labstockpro",
  storageBucket: "actia-labstockpro.appspot.com",
  messagingSenderId: "925131652423",
  appId: "1:925131652423:web:357c27c88635856a80a062",
  measurementId: "G-1NEXF3EZ3X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const FIRESTORE_DB= getFirestore(FIREBASE_APP);
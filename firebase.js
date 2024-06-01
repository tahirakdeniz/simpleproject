// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBlkTsfbSEtr_MN0CVDkA1e6erzdCZF7qs",
    authDomain: "ecommercewebsite-81922.firebaseapp.com",
    projectId: "ecommercewebsite-81922",
    storageBucket: "ecommercewebsite-81922.appspot.com",
    messagingSenderId: "193954300185",
    appId: "1:193954300185:web:666d3f5758223750ac0588",
    measurementId: "G-36S4X45NLQ",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, onSnapshot };

// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlkTsfbSEtr_MN0CVDkA1e6erzdCZF7qs",
  authDomain: "ecommercewebsite-81922.firebaseapp.com",
  databaseURL: "https://ecommercewebsite-81922-default-rtdb.firebaseio.com",
  projectId: "ecommercewebsite-81922",
  storageBucket: "ecommercewebsite-81922.appspot.com",
  messagingSenderId: "193954300185",
  appId: "1:193954300185:web:11aff366a2d5012cac0588",
  measurementId: "G-TV00F85X4W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, onSnapshot };

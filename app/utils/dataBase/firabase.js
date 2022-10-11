import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Constants from "expo-constants";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSRw0V1g4Bgdcy12O4hvfkWH8Sr5EoiVI",
  authDomain: "srmt-c750e.firebaseapp.com",
  databaseURL: "https://srmt-c750e.firebaseio.com",
  projectId: "srmt-c750e",
  storageBucket: "srmt-c750e.appspot.com",
  messagingSenderId: "641023770270",
  appId: "1:641023770270:web:bd9d08fa8fb675375bc58f",
};

// initialize firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const firebaseauth = getAuth();
const EmailAndPassword = signInWithEmailAndPassword;
const authStateChanged = onAuthStateChanged;
const storage = getStorage();

export {
  firebaseApp,
  db,
  collection,
  getDocs,
  doc,
  firebaseauth,
  storage,
  EmailAndPassword,
  authStateChanged,
};

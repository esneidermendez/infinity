import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  EmailAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  updateEmail,
  reauthenticateWithCredential,
  FacebookAuthProvider,
  signInWithPopup,
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
const dbSetDoc = setDoc;
const firebaseauth = getAuth();
const EmailAndPassword = signInWithEmailAndPassword;
const authStateChanged = onAuthStateChanged;
const createUser = createUserWithEmailAndPassword;
const reauthenticated = reauthenticateWithCredential;
const updateProfil = updateProfile;
const updatePass = updatePassword;
const UpdateEmail = updateEmail;
const storage = getStorage(firebaseApp);
const UploadBytes = uploadBytes;
const DownloadURL = getDownloadURL;
const getRef = ref;

export {
  firebaseApp,
  db,
  collection,
  getDocs,
  doc,
  dbSetDoc,
  firebaseauth,
  storage,
  UploadBytes,
  DownloadURL,
  getRef,
  EmailAndPassword,
  authStateChanged,
  createUser,
  reauthenticated,
  updateProfil,
  updatePass,
  UpdateEmail,
  EmailAuthProvider,
  addDoc,
  FacebookAuthProvider,
  signInWithPopup,
};

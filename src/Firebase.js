import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/firebase-storage"
import "firebase/firebase-auth"

const firebaseConfig = {
  apiKey: "AIzaSyBykSzyyaj-FwXgteuIBgP1y1Kezdr5d_o",
  authDomain: "linkedin-clone-51641.firebaseapp.com",
  projectId: "linkedin-clone-51641",
  storageBucket: "linkedin-clone-51641.appspot.com",
  messagingSenderId: "800762218585",
  appId: "1:800762218585:web:a116864cd602587c4d8948"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();


export {auth, provider, storage}

export default db;
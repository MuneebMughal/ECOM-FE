// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwfOy1uWzN0RT9ZVcLFPftX_-daLnnhA0",
  authDomain: "muneeb-mart.firebaseapp.com",
  projectId: "muneeb-mart",
  storageBucket: "muneeb-mart.appspot.com",
  messagingSenderId: "680533386790",
  appId: "1:680533386790:web:9d75babd7f4d9a4319e8e7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
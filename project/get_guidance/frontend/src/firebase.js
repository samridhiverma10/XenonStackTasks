// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfXjpzYvKpNLoMh6D_eD-Rc7-uRVxd6eA",
  authDomain: "get-guidance-mern.firebaseapp.com",
  projectId: "get-guidance-mern",
  storageBucket: "get-guidance-mern.appspot.com",
  messagingSenderId: "1074457043837",
  appId: "1:1074457043837:web:c8647812e5c91aa7fb6214",
  measurementId: "G-VH4JBDHLD8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = new getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };

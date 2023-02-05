// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtMcrsmNW9DsS60GmZezCbXzS4yXlRof0",
  authDomain: "chat-app-37b9f.firebaseapp.com",
  projectId: "chat-app-37b9f",
  storageBucket: "chat-app-37b9f.appspot.com",
  messagingSenderId: "895671738442",
  appId: "1:895671738442:web:24bc7f0233328f459506b3",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

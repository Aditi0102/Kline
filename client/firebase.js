// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFckP6q9UOLuB6CEeeUeiIlJqCWFjQP38",
  authDomain: "klinedecor-d631b.firebaseapp.com",
  projectId: "klinedecor-d631b",
  storageBucket: "klinedecor-d631b.appspot.com",
  messagingSenderId: "334007326477",
  appId: "1:334007326477:web:3efc27a7d9346739930244",
  measurementId: "G-8EBNJ94HLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
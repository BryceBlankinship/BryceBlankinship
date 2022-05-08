// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { authDomain } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHKyi_rTVF4BI-wwMKNpaDjkOEl5fmsZk",
  authDomain: "bryce-portfolio1.firebaseapp.com",
  projectId: "bryce-portfolio1",
  storageBucket: "bryce-portfolio1.appspot.com",
  messagingSenderId: "17495346051",
  appId: "1:17495346051:web:aa5446719a770556ae44b6",
  measurementId: "G-Y3SL47CNP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
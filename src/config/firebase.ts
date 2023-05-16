// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgfn8vhRDU_LANljlzhLVzeH4r0SQp8Aw",
  authDomain: "web-shopping-cart-d3780.firebaseapp.com",
  projectId: "web-shopping-cart-d3780",
  storageBucket: "web-shopping-cart-d3780.appspot.com",
  messagingSenderId: "479676130947",
  appId: "1:479676130947:web:64ad7ebb86f51b5f931db6",
  measurementId: "G-KMYN4BK7TY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

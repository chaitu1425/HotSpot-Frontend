// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hotspot-9c2ee.firebaseapp.com",
  projectId: "hotspot-9c2ee",
  storageBucket: "hotspot-9c2ee.firebasestorage.app",
  messagingSenderId: "1069526136750",
  appId: "1:1069526136750:web:9b3893876ac80be2143a3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app,auth}

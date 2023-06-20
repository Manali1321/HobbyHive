// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAytoN7wXlQZZbT2FsvbxT2K-GJ-fW2ni4",
  authDomain: "hobbyhive-cb0d6.firebaseapp.com",
  projectId: "hobbyhive-cb0d6",
  storageBucket: "hobbyhive-cb0d6.appspot.com",
  messagingSenderId: "347774363410",
  appId: "1:347774363410:web:95b998da98cfd5c0b6b5cb",
  measurementId: "G-T1GWXKZS88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
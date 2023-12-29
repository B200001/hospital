// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKuBWGOYnqtm6V00Z-wLcKfwI4nSUIHhQ",
  authDomain: "hospital-form-5d5dd.firebaseapp.com",
  databaseURL: "https://hospital-form-5d5dd-default-rtdb.firebaseio.com",
  projectId: "hospital-form-5d5dd",
  storageBucket: "hospital-form-5d5dd.appspot.com",
  messagingSenderId: "1046070543176",
  appId: "1:1046070543176:web:d2ab1c9bad5fdefd4ee97d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;

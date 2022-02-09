// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXm7A-x3JyaOa3qQ3ZK2jAG64B7qCMjAo",
    authDomain: "fi-todo-app2.firebaseapp.com",
    projectId: "fi-todo-app2",
    storageBucket: "fi-todo-app2.appspot.com",
    messagingSenderId: "1023279041422",
    appId: "1:1023279041422:web:1afb048d9f4f86c92b32df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

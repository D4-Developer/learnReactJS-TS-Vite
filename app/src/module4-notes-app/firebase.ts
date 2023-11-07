import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBmwar8tGeRXLgNHfejicA6nXwbX8abIVo",
    authDomain: "react-notes-zl.firebaseapp.com",
    projectId: "react-notes-zl",
    storageBucket: "react-notes-zl.appspot.com",
    messagingSenderId: "734270523688",
    appId: "1:734270523688:web:c1f88d570f7a9361b2681d",
    measurementId: "G-4RPL41Z4XD"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
// const analytics = getAnalytics(app);
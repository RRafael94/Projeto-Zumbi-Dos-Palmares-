
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";




const firebaseConfig = {
    apiKey: "AIzaSyDuUNoe0GHXcN55oW-zXMoAVUrH-sDqVXk",
    authDomain: "projetozumbidospalmares-3cfa0.firebaseapp.com",
    databaseURL: "https://projetozumbidospalmares-3cfa0-default-rtdb.firebaseio.com",
    projectId: "projetozumbidospalmares-3cfa0",
    storageBucket: "projetozumbidospalmares-3cfa0.appspot.com",
    messagingSenderId: "349577385989",
    appId: "1:349577385989:web:bb11260eac1cb5675fa46c",
    measurementId: "G-5JC2SK1HT7"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyASuxz0MLpjWmRKxnpoA22R-IYXaglJMGI",
    authDomain: "debateevaluator.firebaseapp.com",
    projectId: "debateevaluator",
    storageBucket: "debateevaluator.firebasestorage.app",
    messagingSenderId: "654145891708",
    appId: "1:654145891708:web:982416e62ff43eba7a08f9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

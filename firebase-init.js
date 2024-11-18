import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXIM7RcvjeoimaFARfmJ1NPkfM-ucLx70",
    authDomain: "watches-magazine.firebaseapp.com",
    databaseURL: "https://watches-magazine-default-rtdb.firebaseio.com",
    projectId: "watches-magazine",
    storageBucket: "watches-magazine.firebasestorage.app",
    messagingSenderId: "119718487868",
    appId: "1:119718487868:web:c231ad442a273d584ca039",
    measurementId: "G-WTTT7ZJWJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

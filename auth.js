// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXIM7RcvjeoimaFARfmJ1NPkfM-ucLx70",
    authDomain: "watches-magazine.firebaseapp.com",
    projectId: "watches-magazine",
    storageBucket: "watches-magazine.firebasestorage.app",
    messagingSenderId: "119718487868",
    appId: "1:119718487868:web:c231ad442a273d584ca039",
    measurementId: "G-WTTT7ZJWJV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
            // On success, redirect to the dataPage.html
            window.location.href = "dataPage.html";
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById('error-message').innerText = errorMessage;
            console.log("Error Code: " + errorCode + " Message: " + errorMessage);
        });
});

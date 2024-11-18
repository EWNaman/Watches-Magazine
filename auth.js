import { auth } from "./firebase-init.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Function to dynamically load multiple scripts
function loadScripts(scriptPaths) {
    scriptPaths.forEach((filePath) => {
        const script = document.createElement("script");
        script.src = filePath;
        script.type = "module"; // Adjust this if scripts are not ES Modules
        document.head.appendChild(script);
    });
}

// Check Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.querySelector(".container").style.display = "block";
        document.getElementById("logoutButton").style.display = "block";

        // Dynamically load home page scripts for logged-in users
        loadScripts(["data.js", "script.js"]);
        console.log("User is logged in:", user);
    } else {
        console.log("User is not logged in. Redirecting to login page...");
        window.location.href = "login.html";
    }
});

// Logout Function
window.handleLogout = function () {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error logging out:", error);
        });
};

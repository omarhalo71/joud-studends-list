// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB...uNBge",
    authDomain: "joud-students-list.firebaseapp.com",
    projectId: "joud-students-list",
    storageBucket: "joud-students-list.appspot.com",
    messagingSenderId: "294045028448",
    appId: "1:294045028448:web:570ce786d509c256f4b305",
    measurementId: "G-2S56GWCWEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Function to save data
window.saveData = function() {
    const username = document.getElementById('username').value;
    set(ref(database, 'users/username'), {
        username: username
    });
    displayData();
}

// Function to display data
window.displayData = function() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/username')).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('display').innerText = `Hello, ${data.username}!`;
        } else {
            document.getElementById('display').innerText = 'No data available';
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Display data on page load
window.onload = displayData;

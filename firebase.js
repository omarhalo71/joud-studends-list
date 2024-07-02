// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child, remove, push } from "firebase/database";

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

// Function to save task
window.saveTask = function() {
    const task = document.getElementById('username').value;
    push(ref(database, 'tasks'), {
        task: task
    }).then(() => {
        displayData();
    }).catch((error) => {
        console.error(error);
    });
}

// Function to display tasks
window.displayData = function() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'tasks')).then((snapshot) => {
        if (snapshot.exists()) {
            const tasks = snapshot.val();
            const container = document.getElementById('container');
            container.innerHTML = ''; // Clear previous tasks
            for (let key in tasks) {
                addTaskToDOM(tasks[key].task, key);
            }
        } else {
            document.getElementById('display').innerText = 'No tasks available';
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Function to delete task
window.deleteTask = function(taskKey) {
    remove(ref(database, 'tasks/' + taskKey)).then(() => {
        displayData();
    }).catch((error) => {
        console.error(error);
    });
}

// Function to add task to DOM
window.addTaskToDOM = function(task, key) {
    const container = document.getElementById('container');
    const taskHTML = `
        <div class="task">
            <span class="icon-star icon"></span>
            <p lang="ar" class="task-text">${task}</p>
            <div>
                <span class="icon-trash icon" onclick="deleteTask('${key}')"></span>
                <span class="icon-angry2 icon"></span>
            </div>
        </div>`;
    container.innerHTML += taskHTML;
}

// Display tasks on page load
window.onload = displayData;

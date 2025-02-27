// This file contains the JavaScript logic for handling user submissions, interacting with a database to store usernames, and randomly selecting a winner each week.

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const usernameForm = document.getElementById('usernameForm');
const winnerDisplay = document.getElementById('winner');

usernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    submitUsername(username);
});

function submitUsername(username) {
    const usernameRef = firebase.database().ref('usernames');
    usernameRef.push(username)
        .then(() => {
            alert('Username submitted successfully!');
            usernameForm.reset();
        })
        .catch((error) => {
            console.error('Error submitting username:', error);
        });
}

function selectWinner() {
    const usernameRef = firebase.database().ref('usernames');
    usernameRef.once('value', (snapshot) => {
        const usernames = [];
        snapshot.forEach((childSnapshot) => {
            usernames.push(childSnapshot.val());
        });
        if (usernames.length > 0) {
            const winner = usernames[Math.floor(Math.random() * usernames.length)];
            winnerDisplay.innerText = `Winner: ${winner}`;
        } else {
            winnerDisplay.innerText = 'No entries yet.';
        }
    });
}

// Call selectWinner function weekly (for demonstration purposes, you can set a real schedule)
setInterval(selectWinner, 604800000); // 604800000 ms = 1 week
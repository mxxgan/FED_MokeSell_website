window.onscroll = function() {
    let scrolled = (document.documentElement.scrollTop || document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';
}


// chat page 
let currentChat = "";

// Function to open a chat
function openChat(user) {
    document.getElementById("chatUser").innerText = user;
    document.getElementById("chatMessages").innerHTML = ""; // Clear previous messages
    currentChat = user;
}

// Function to send a message
function sendMessage() {
    let messageInput = document.getElementById("messageInput");
    let messageText = messageInput.value.trim();
    let chatMessages = document.getElementById("chatMessages");

    if (messageText === "" || currentChat === "") return;

    let newMessage = document.createElement("p");
    newMessage.innerText = "You: " + messageText;
    chatMessages.appendChild(newMessage);

    messageInput.value = ""; // Clear input field
}


// Login 
// Function to Open Modal
function openModal() {
    document.getElementById("loginModal").style.display = "block";
}

// Function to Close Modal
function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}
// hide and unhide password
function togglePassword() {
    let passwordInput = document.getElementById("password");
    let eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "eye-closed-icon.png"; // Change to closed eye PNG
    } else {
        passwordInput.type = "password";
        eyeIcon.src = "eye-open-icon.png"; // Change back to open eye PNG
    }
}

// Function to Handle Login (Simple Alert Example)
function submitLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        alert("Welcome " + username + "!");
        closeModal();
    } else {
        alert("Invalid username or password!");
    }
}
// api
const API_URL = "https://yourdb.restdb.io/rest/users"; // Replace with your RestDB collection
    const API_KEY = "your-api-key"; // Replace with your RestDB API key

    async function submitLogin() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        // Password must contain letters and numbers (at least 6 chars)
        let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordPattern.test(password)) {
            alert("Password must contain at least one letter, one number, and be at least 6 characters long.");
            return;
        }

        try {
            // Fetch users from RestDB
            let response = await fetch(`${API_URL}?q={"username": "${username}"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": API_KEY
                }
            });

            let users = await response.json();

            if (users.length === 0) {
                alert("User not found!");
                return;
            }

            // Check if password matches
            let user = users[0]; // Assume first match
            if (user.password === password) { // ⚠️ Passwords should be hashed for security
                alert("Login successful!");
                closeModal();
            } else {
                alert("Incorrect password!");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Error logging in. Please try again later.");
        }
    }


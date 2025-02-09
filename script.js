window.onscroll = function() {
    let scrolled = (document.documentElement.scrollTop || document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';
};

document.addEventListener('DOMContentLoaded', function () {
    const APIKEY = "67920f3052b8e1fed15efd5a";

    // Login and sign up api
    const loginLinkBtn = document.getElementById("login-link-btn");
    if (loginLinkBtn) {
        loginLinkBtn.addEventListener("click", function () {
            closeSignUpModal(); // Close the sign-up modal
            openLoginModal();   // Open the login modal
        });
    }

    const signupLinkBtn = document.getElementById("signup-link-btn");
    if (signupLinkBtn) {
        signupLinkBtn.addEventListener("click", function () {
            closeLoginModal();  // Close the login modal
            openSignUpModal();  // Open the sign-up modal
        });
    }

    function handleSignUp() {
        let username = document.getElementById("acct_username").value;
        let email = document.getElementById("acct_email").value;
        let password = document.getElementById("acct_password").value;
        let confirmPassword = document.getElementById("acct_confirm-password").value;

        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let jsondata = {username, email, password};

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata)
        };

        fetch("https://login-a8dd.restdb.io/rest/account", settings)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("submitSignUp").disabled = true;
                document.getElementById("signUpForm").reset();
                alert("Sign-up successful!");
                window.location.href = "signup_loggedin.html";
            })
            .catch(error => console.log(error));
    }

    const submitSignUpBtn = document.getElementById("submitSignUp");
    if (submitSignUpBtn) {
        submitSignUpBtn.addEventListener("click", function (e) {
            e.preventDefault();
            handleSignUp();
        });
    }

    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
        signUpForm.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleSignUp();
            }
        });
    }

    function handleLogin() {
        let email = document.getElementById("login_email").value;
        let password = document.getElementById("login_password").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        let apiUrl = `https://login-a8dd.restdb.io/rest/account?q={"email":"${email}"}`;

        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            }
        };

        fetch(apiUrl, settings)
            .then(response => response.json())
            .then(data => {
                console.log("Response data:", data);

                if (data.length === 0) {
                    alert("User not found!");
                    return;
                }

                let user = data[0];

                if (user.password === password) {
                    sessionStorage.setItem('currentUserUsername', user.username);
                    document.getElementById("submitLogin").disabled = true;
                    document.getElementById("loginForm").reset();
                    alert("Login successful!");
                    if (user.username === 'bboogyuli') {
                        window.location.href = "loggedin.html";
                    } else {
                        window.location.href = "signup_loggedin.html";
                    }
                } else {
                    alert("Incorrect password.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    const submitLoginBtn = document.getElementById("submitLogin");
    if (submitLoginBtn) {
        submitLoginBtn.addEventListener("click", function (e) {
            e.preventDefault();
            handleLogin();
        });
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                handleLogin();
            }
        });
    }

    function fetchUsername() {
        console.log('fetchUsername function called');
        const currentUserUsername = sessionStorage.getItem('currentUserUsername');
        console.log('Retrieved username:', currentUserUsername);

        if (!currentUserUsername) {
            console.error('No user is logged in');
            return;
        }

        const apiUrl = `https://login-a8dd.restdb.io/rest/account?q={"username":"${currentUserUsername}"}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'x-apikey': APIKEY,
                'cache-control': 'no-cache'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const user = data[0];
                document.getElementById('user-name').textContent = `@ ${user.username}`;
            } else {
                console.error('No user found with the provided username');
            }
        })
        .catch(error => console.error('Error:', error));
    }
    fetchUsername();

    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
        loginModal.addEventListener("click", function(event) {
            event.stopPropagation(); 
        });
    }

    const signUpModal = document.getElementById("signUpModal");
    if (signUpModal) {
        signUpModal.addEventListener("click", function(event) {
            event.stopPropagation(); 
        });
    }

    // products page --------------------------------------------------------------------------------------------------------------
    const bigImage = document.querySelector(".big-image img");
    const smallImages = document.querySelectorAll(".small-image img");

    smallImages.forEach(img => {
        img.addEventListener("click", function () {
            bigImage.src = this.src;
        });
    });
    // home page ---------------------------------------------------------------------------------------------------------------
    const dropdowns = document.querySelectorAll('.filter-dropdown');
    const products = document.querySelectorAll('.product-item');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function () {
            let selectedCategory = this.value;
            filterProducts(selectedCategory);
        });
    });

    const allButton = document.querySelector('.filter-btn[data-category="all"]');
    if (allButton) {
        allButton.addEventListener('click', function () {
            filterProducts('all');
        });
    }

    function filterProducts(category) {
        products.forEach(product => {
            let productCategory = product.getAttribute('data-category');
            if (category === 'all' || productCategory === category) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    }
});

// Functions to Open and Close Modals
function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
}
function openSignUpModal() {
    document.getElementById("signUpModal").style.display = "block";
}
function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}
function closeSignUpModal() {
    document.getElementById("signUpModal").style.display = "none";
}

// Toggle Password Visibility
function togglePassword(inputId, eyeIconId) {
    let passwordInput = document.getElementById(inputId);
    let eyeIcon = document.getElementById(eyeIconId);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "images/eye-open-icon.png";
    } else {
        passwordInput.type = "password";
        eyeIcon.src = "images/eye-closed-icon.png";
    }
}

// // chat page -------------------------------------------------------------------------------------------------
// let currentChat = "";

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

function redirectToChat() {
    window.location.href = "userchat.html";
}

function updateChat(profilePic, username) {
    document.getElementById("headerProfilePic").src = profilePic; // Update profile picture
    document.getElementById("chatUser").textContent = username; // Update username
}

function sendMessage() {
    let messageInput = document.getElementById("messageInput");
    let messageText = messageInput.value.trim();
    let chatMessages = document.getElementById("chatMessages");

    if (messageText === "") return; // Prevent empty messages

    let newMessage = document.createElement("div");
    newMessage.classList.add("chat-message");
    newMessage.innerHTML = `<p>You: ${messageText}</p>`;

    chatMessages.appendChild(newMessage);
    messageInput.value = ""; // Clear input field
}




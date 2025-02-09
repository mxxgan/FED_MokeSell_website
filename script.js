window.onscroll = function() {
    let scrolled = (document.documentElement.scrollTop || document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';
}


// Login and sign up api
document.addEventListener('DOMContentLoaded', function () {
    const APIKEY = "67920f3052b8e1fed15efd5a";

    document.getElementById("login-link-btn").addEventListener("click", function () {
        closeSignUpModal(); // Close the sign-up modal
        openLoginModal();   // Open the login modal
    });

    // Fix for sign-up button inside the login modal
    document.getElementById("signup-link-btn").addEventListener("click", function () {
        closeLoginModal();  // Close the login modal
        openSignUpModal();  // Open the sign-up modal
    });

    // Function to handle user signup
    function handleSignUp() {
        let username = document.getElementById("acct_username").value;
        let email = document.getElementById("acct_email").value;
        let password = document.getElementById("acct_password").value;
        let confirmPassword = document.getElementById("acct_confirm-password").value;

        // Check if all fields are filled
        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        // Check if passwords match
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
                closeSignUpModal();
                openLoginModal(); // Automatically open login after signup
            })
            .catch(error => console.log(error));
    }

    // Attach click event listener to signup button
    document.getElementById("submitSignUp").addEventListener("click", function (e) {
        e.preventDefault();
        handleSignUp();
    });

    // Attach keydown event listener to sign-up form (only inside the form)
    document.getElementById("signUpForm").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSignUp();
        }
    });

    // Function to handle user login
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

                let user = data[0]; // Assuming email is unique and we get one match

                if (user.password === password) {
                    sessionStorage.setItem('currentUserUsername', user.username);
                    document.getElementById("submitLogin").disabled = true;
                    document.getElementById("loginForm").reset();
                    alert("Login successful!");
                    window.location.href = "loggedin.html"; // Redirect
                } else {
                    alert("Incorrect password.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    // Attach click event listener to login button
    document.getElementById("submitLogin").addEventListener("click", function (e) {
        e.preventDefault();
        handleLogin();
    });

    // Attach keydown event listener to login form (only inside the form)
    document.getElementById("loginForm").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleLogin();
        }
    });


    // print out username
    fetchUsername();

    function fetchUsername() {
        // Get the current user's email from localStorage
        const currentUserUsername = sessionStorage.getItem('currentUserUsername');
        
        if (!currentUserEmail) {
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
                if (user.username === 'bboogyuli' && user.email === 'bboogyuli@gmail.com') {
                    window.location.href = 'loggedin.html'; 
                } else {
                    window.location.href = 'signup_loggedin.html'; 
                }
            } else {
                console.error('No user found with the provided email');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    // generate user pfp
    fetch('https://randomuser.me/api/')
    .then(
      function(response) {
        return response.json();
      }
    )
    .then(function (data) {
      const results = data.results[0];
      console.log(results.name); // to see the debugging information (optional)
      $("#avatar").attr('src', `${results.picture.medium}`);
    })
    .catch(error => console.error('Error:', error));
});

// prevent accidental modal closing
document.getElementById("loginModal").addEventListener("click", function(event) {
    event.stopPropagation(); 
});
document.getElementById("signUpModal").addEventListener("click", function(event) {
    event.stopPropagation(); 
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

// products page ---------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const bigImage = document.querySelector(".big-image img");
    const smallImages = document.querySelectorAll(".small-image img");

    smallImages.forEach(img => {
        img.addEventListener("click", function () {
            bigImage.src = this.src; // Change big image to clicked small image
        });
    });
});



// home page ---------------------------------------------------------------------------------------------------------------

// Get all category dropdowns
const dropdowns = document.querySelectorAll('.filter-dropdown');
const allButton = document.querySelector('.filter-btn[data-category="all"]');
const products = document.querySelectorAll('.product-item');

// Handle category filtering via dropdowns
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', function () {
        let selectedCategory = this.value;
        filterProducts(selectedCategory);
    });
});

// Handle "All" button click
allButton.addEventListener('click', function () {
    filterProducts('all');
});

// Function to filter products based on selected category
function filterProducts(category) {
    products.forEach(product => {
        let productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'flex'; // Show matching products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    });
}




window.onscroll = function() {
    let scrolled = (document.documentElement.scrollTop || document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';
}


// Login 
// Function to Open Modal
function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
}
function openSignUpModal() {
    document.getElementById("signUpModal").style.display = "block";
}

// Function to Close Modal
function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}
function closeSignUpModal() {
    document.getElementById("signUpModal").style.display = "none";
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

        // Store login state in localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("username", username); // Store username if needed

        // Close the login modal
        closeModal();

        // Update the navbar
        updateNavbar();

        // Redirect to the home/profile page
        window.location.href = "profile.html"; // Change to your desired page
    } else {
        alert("Invalid username or password!");
    }
}
// Function to Handle Sign Up (Simple Alert Example)
function submitSignUp() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (username === "") {
        alert("Username cannot be empty!"); 
    } else {
        console.log("Logging in as:", username); 
    }

    if (email === "") {
        alert("Email cannot be empty!"); 
    } else if (!email.includes("@")) {
        alert("Please enter a valid email address!"); 
    } else {
        console.log("Signing up with email:", email);
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert("Sign-Up Successful!");
    closeSignUpModal();
}
// -----------------------------------------------------------------------------
// api
// const API_URL = "https://login-a8dd.restdb.io/rest/account"; // Replace with your RestDB collection
//     const API_KEY = "67920f3052b8e1fed15efd5a"; // Replace with your RestDB API key


//[STEP 0]: Make sure our document is A-OK
document.addEventListener('DOMContentLoaded', function () {
    const APIKEY = "67920f3052b8e1fed15efd5a";
    // document.getElementById("update-contact-container").style.display = "none";
    // document.getElementById("add-update-msg").style.display = "none";
  
    //[STEP 1]: Create our submit form listener
    document.getElementById("submitSignUp").addEventListener("click", function (e) {
      e.preventDefault();
  
      //[STEP 2]: let's retrieve form data
      //for now we assume all information is valid
      //you are to do your own data validation
      let username = document.getElementById("acct_username").value;
      let email = document.getElementById("acct_email").value;
      let password = document.getElementById("acct_password").value;
  
      //[STEP 3]: get form values when user clicks on send
      //Adapted from restdb api
      let jsondata = {
        "username": username,
        "email": email,
        "password": password,
      };
  
      //[STEP 4]: Create our AJAX settings. Take note of API key
      let settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata)
      };
  
      //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
      fetch("https://login-a8dd.restdb.io/rest/account", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
  
          document.getElementById("submitSignUp").disabled = true;
          document.getElementById("signUpForm").reset();
        })
        .catch(error => console.log(error));
    });
  });
  
// // chat page 
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



// products page
document.addEventListener("DOMContentLoaded", function () {
    const bigImage = document.querySelector(".big-image img");
    const smallImages = document.querySelectorAll(".small-image img");

    smallImages.forEach(img => {
        img.addEventListener("click", function () {
            bigImage.src = this.src; // Change big image to clicked small image
        });
    });
});

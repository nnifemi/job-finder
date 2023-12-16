'use strict';

const options = {
    method: 'GET',
    mode: 'cors'
};

// Function to set default credentials for testing
function setDefaultCredentials() {
    localStorage.setItem('storedUsername', 'testUser');
    localStorage.setItem('storedPassword', 'testPassword');
}

// Check if stored credentials exist, if not, set default credentials
if (!localStorage.getItem('storedUsername') || !localStorage.getItem('storedPassword')) {
    setDefaultCredentials();
}

function attemptLogin() {
    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('storedUsername');
    const storedPassword = localStorage.getItem('storedPassword');

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // Check if the entered credentials are not empty
    if (enteredUsername.trim() === '' || enteredPassword.trim() === '') {
        errorMessage.textContent = 'Please enter both username and password';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 2000);
        return;
    }

    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        // Successful login
        localStorage.setItem('loggedInUser', enteredUsername);
        window.location.href = './home.html';
    } else {
        // Failed login
        errorMessage.textContent = 'Incorrect username or password';

        // Clear error message after 2 seconds
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 2000);
    }
}

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    attemptLogin();
});

// Call attemptLogin function when the login button is clicked
document.getElementById('login').addEventListener('click', attemptLogin);

'use strict';

// Function to set/show the users
function setUsers(usersList) {
    const rightColumn = document.getElementById('rightColumn');
    const userProfiles = document.getElementById('userProfiles');

    // Clear existing content in the right column
    userProfiles.innerHTML = '';

    // Loop through each user and create HTML
    usersList.forEach((user) => {
        const userElement = document.createElement('div');
        userElement.classList.add('user-profile');

        // Profile picture
        const profilePic = document.createElement('img');
        profilePic.src = user.picture.medium;
        profilePic.alt = 'Profile Picture';
        userElement.appendChild(profilePic);

        // Full name
        const fullName = document.createElement('p');
        fullName.textContent = `${user.name.first} ${user.name.last}`;
        userElement.appendChild(fullName);

        // City
        const city = document.createElement('p');
        city.textContent = user.location.city;
        userElement.appendChild(city);

        // Append the user element to the right column  
        userProfiles.appendChild(userElement);
    });
}


// Function to get users
async function getUsers() {
    const URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';

    try {
        const result = await fetch(URL);

        if (!result.ok) {
            throw new Error(`${result.statusText} (${result.status})`);
        }

        const users = await result.json();
        const list = users.results;

        // Call the function to set/show the users
        setUsers(list);
    } catch (error) {
        console.log(error.message);
    }
}

// Fetch random users from the API and display them when the script runs
getUsers();

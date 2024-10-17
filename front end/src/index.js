// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import readline from 'readline';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDipj_QS5IMOQYgmZ6ffrLq-uMxIXm-YNg",
  authDomain: "skillsfturentu.firebaseapp.com",
  databaseURL: "https://skillsfturentu-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "skillsfturentu",
  storageBucket: "skillsfturentu.appspot.com",
  messagingSenderId: "111119925054",
  appId: "1:111119925054:web:5dc91e4d5651f8780b366f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the database instance
const db = getDatabase();

// Function to write user data
function writeUserData(userId, name, email) {
  const reference = ref(db, 'users/' + userId);  // Create a reference to the user's path

  // Set the user data
  set(reference, {
    username: name,
    email: email,
  })
  .then(() => {
    console.log("User data written successfully!");
  })
  .catch((error) => {
    console.error("Error writing user data: ", error);
  });
}

// Function to retrieve user data
function retrieveUserData(userId) {
  const userDataRef = ref(db, 'users/' + userId);  // Create a reference to the user's data

  // Listen for data changes at the user data reference
  onValue(userDataRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      // Print out user information
      console.log("User Information:");
      console.log("User ID:", userId);
      console.log("Username:", data.username);
      console.log("Email:", data.email);
    } else {
      console.log("No user data found.");
    }
  });
}

// Create an interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to display the menu and handle user input
function displayMenu() {
  console.log("\nMenu:");
  console.log("1. Add User");
  console.log("2. Retrieve User Info");
  console.log("3. Exit");

  
  rl.question("Choose an option: ", (choice) => {
    if (choice === '1') {
      rl.question("Enter your User ID: ", (userId) => {
        rl.question("Enter your Username: ", (username) => {
          rl.question("Enter your Email: ", (email) => {
            // Write user data to Firebase
            writeUserData(userId, username, email);
            displayMenu(); // Show the menu again after writing data
          });
        });
      });
    } else if (choice === '2') {
      rl.question("Enter User ID to retrieve: ", (userId) => {
        // Retrieve user data from Firebase
        retrieveUserData(userId);
        displayMenu(); // Show the menu again after retrieving data
      });
    } else if (choice === '3') {
      console.log("Exiting the program. Goodbye!");
      rl.close(); // Close the readline interface
    } else {
      console.log("Invalid option, please try again.");
      displayMenu(); // Show the menu again for invalid option
    }
  });
}

// Start the program by displaying the menu
displayMenu();

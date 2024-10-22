import { useState } from "react";
import "./SignUpForm.css";
import axios from "axios"; // Import axios for making HTTP requests

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState(""); // Add industry state
  const [userType, setUserType] = useState("Job Seeker"); // Add user type state

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onButtonClick = async () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    // Validation logic
    if (firstName.trim() === "") {
      setFirstNameError("Please enter your first name");
      return;
    }
    if (lastName.trim() === "") {
      setLastNameError("Please enter your last name");
      return;
    }
    if (email.trim() === "") {
      setEmailError("Please enter your email");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Please enter a password");
      return;
    }
    if (password.length < 8) { // Ensure minimum password length
      setPasswordError("Password must be 8 characters or longer");
      return;
    }
    if (!/^[a-zA-Z ]*$/.test(firstName)) {
      setFirstNameError("Please enter a valid first name");
      return;
    }
    if (!/^[a-zA-Z ]*$/.test(lastName)) {
      setLastNameError("Please enter a valid last name");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // If all validations pass, call the register API
    try {
      const response = await axios.post("http://localhost:5000/register", {
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        industry,
        user_type: userType
      });
      
      // If registration is successful, redirect to the home page
      if (response.status === 201) {
        window.location.href = "/home"; // Redirect to home or another page
      }
    } catch (error) {
      // Handle error response from the API
    }
  };

  return (
    <div className="sign-up-box">
      <h2>Sign Up</h2>
      <form>
        <div className="user-box">
          <input
            value={firstName}
            placeholder="Enter first name here"
            onChange={(ev) => setFirstName(ev.target.value)}
            className={"user-box"}
          />
          <label className="errorLabel">{firstNameError}</label>
        </div>
        <div className="user-box">
          <input
            value={lastName}
            placeholder="Enter last name here"
            onChange={(ev) => setLastName(ev.target.value)}
            className={"user-box"}
          />
          <label className="errorLabel">{lastNameError}</label>
        </div>
        <div className="user-box">
          <input
            value={email}
            placeholder="Enter email address here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={"user-box"}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="user-box">
          <input
            value={password}
            placeholder="Enter password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={"user-box"}
            type="password" // Add type="password" for password input
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <div className="user-box">
          <input
            value={industry}
            placeholder="Enter your industry"
            onChange={(ev) => setIndustry(ev.target.value)}
            className={"user-box"}
          />
        </div>
        <div className="user-box">
          <select
            value={userType}
            onChange={(ev) => setUserType(ev.target.value)}
            className={"user-box"}
          >
            <option value="Job Seeker">Job Seeker</option>
            <option value="Employer">Employer</option>
          </select>
        </div>
        <input
          onClick={onButtonClick}
          className={"inputButton"}
          type="button"
          value={"Sign Up"}
        />
      </form>
    </div>
  );
}

export default SignUpForm;

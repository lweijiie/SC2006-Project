import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  NAV_LINKS,
} from "../../../constants";

import {
  validateEmail,
  validatePassword,
} from "../../../utils/errorValidation";

interface Props {
  email: string;
  password: string;
}

function EmployerSignUpForm() {
  const [formData, setFormData] = useState<Props>({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const loginLink = `${NAV_LINKS.base_link}${NAV_LINKS.employer_login}`;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Validation
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    
    if (emailValidation || passwordValidation) {
      return;
    }

    
    setLoading(true);
    setError(null);
    setSuccessMessage(null); 

    try {
      const response = await fetch(API_BASE_URL + "/register-employer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }

      const data = await response.json();
      console.log("Registration successful:", data);

     
      setSuccessMessage("Successfully signed up!");

      
      setTimeout(() => {
        navigate(NAV_LINKS.employer_login);
      }, 2000); 
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container">
      <h2 className="form-title">Create an Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="user-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email address here"
            onChange={handleChange}
            className="user-box"
          />
          {emailError && <label className="errorLabel">{emailError}</label>}
        </div>
        <div className="user-box">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password here"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle-button"
          >
            {passwordVisible ? "👁️" : "🙈"}
          </button>
          {passwordError && (
            <label className="errorLabel">{passwordError}</label>
          )}
        </div>

        {error && <p className="errorLabel">{error}</p>}
        {successMessage && <p className="successLabel">{successMessage}</p>} 
        <button type="submit" className="input-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div id="redirect">
          <p id="redirect-text">Already have an account?&nbsp;</p>
          <a id="redirect-link" href={loginLink}>
            Login
          </a>
          <p id="redirect-text">&nbsp;now!</p>
        </div>
      </form>
    </div>
  );
}

export default EmployerSignUpForm;

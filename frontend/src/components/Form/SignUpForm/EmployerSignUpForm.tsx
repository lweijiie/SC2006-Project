import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  ERROR_TEXT_FIELD_MESSAGE,
  NAV_LINKS,
} from "../../../constants";

interface Props {
  email: string;
  password: string;
}

function EmployerSignUpForm() {
  const [formData, setFormData] = useState<Props>({
    email: "",
    password: "",
  });

  const loginLink = `${NAV_LINKS.base_link}${NAV_LINKS.employer_login}`;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    if (formData.email === "") {
      setEmailError(ERROR_TEXT_FIELD_MESSAGE.no_email_error);
      hasError = true;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError(ERROR_TEXT_FIELD_MESSAGE.invalid_email_error);
      hasError = true;
    }

    if (formData.password === "") {
      setPasswordError(ERROR_TEXT_FIELD_MESSAGE.no_password_error);
      hasError = true;
    } else if (formData.password.length < 8) {
      setPasswordError(ERROR_TEXT_FIELD_MESSAGE.under_length_password_error);
      hasError = true;
    }

    // Stop submission if there are validation errors
    if (hasError) {
      return;
    }

    // Show loading state and reset errors
    setLoading(true);
    setError(null);

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

      // Redirect to login page on successful registration
      navigate(NAV_LINKS.employer_login);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
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
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter password here"
            onChange={handleChange}
            className="user-box"
          />
          {passwordError && (
            <label className="errorLabel">{passwordError}</label>
          )}
        </div>

        {error && <p className="errorLabel">{error}</p>}
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

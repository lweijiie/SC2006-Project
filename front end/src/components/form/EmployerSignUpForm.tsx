import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, NAV_LINKS } from "../../constants";
import "./SignUpForm.css";

interface Props {
  email: string;
  password: string;
}

function EmployerSignUpForm() {
  const [formData, setFormData] = useState<Props>({
    email: "",
    password: "",
  });

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
      setEmailError("Please enter your email");
      hasError = true;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (formData.password === "") {
      setPasswordError("Please enter a password");
      hasError = true;
    } else if (formData.password.length < 8) {
      setPasswordError("Password must be 8 characters or longer");
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
    <div className="sign-up-box">
      <h2>Create an Account</h2>
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
        <button type="submit" className="inputButton" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <div className="login-text-box">
          <p>Already have an account?&nbsp;</p>
          <a id="login-text" href={NAV_LINKS.employer_login}>
            Login
          </a>
          <p>&nbsp;now!</p>
        </div>
      </form>
    </div>
  );
}

export default EmployerSignUpForm;

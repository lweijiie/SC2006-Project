import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  EDUCATION_LIST,
  INDUSTRY_LIST,
  ERROR_TEXT_FIELD_MESSAGE,
  NAV_LINKS,
} from "../../../constants";

import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateIndustry,
  validateEducation,
} from "../../../utils/errorValidation";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  industry: string;
  education: string;
}

function JobSeekerSignUpForm() {
  const [formData, setFormData] = useState<Props>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    industry: "",
    education: "",
  });

  const loginLink = `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_login}`;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [educationError, setEducationError] = useState("");

  const navigate = useNavigate();
  const industries = INDUSTRY_LIST;
  const educations = EDUCATION_LIST;

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

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setIndustryError("");
    setEducationError("");
    let hasError = false;

    // Validation
    const firstNameValidation = validateFirstName(formData.firstName);
    const lastNameValidation = validateLastName(formData.lastName);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const industryValidation = validateIndustry(formData.industry);
    const educationValidation = validateEducation(formData.education);

    
    setFirstNameError(firstNameValidation);
    setLastNameError(lastNameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setIndustryError(industryValidation);
    setEducationError(educationValidation);

    // Check validation results directly
    if (
      firstNameValidation ||
      lastNameValidation ||
      emailValidation ||
      passwordValidation ||
      industryValidation ||
      educationValidation
    ) {
      return;
    }

  
    // Show loading state and reset errors
    setLoading(true);
    setError(null);
    setSuccessMessage(null); 

    try {
      const response = await fetch(API_BASE_URL + "/register-jobseeker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          industry: formData.industry,
          education: formData.education,
      }),
    });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setSuccessMessage("Successfully signed up!");

      setTimeout(() => {
      navigate(NAV_LINKS.job_seeker_login);
      },2000);
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
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter first name here"
            onChange={handleChange}
            className="user-box"
          />
          {firstNameError && (
            <label className="errorLabel">{firstNameError}</label>
          )}
        </div>
        <div className="user-box">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter last name here"
            onChange={handleChange}
            className="user-box"
          />
          {lastNameError && (
            <label className="errorLabel">{lastNameError}</label>
          )}
        </div>
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

        <div className="user-box">
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="user-box"
          >
            <option value="">Select Industry</option>
            {industries.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {industryError && (
            <label className="errorLabel">{industryError}</label>
          )}
        </div>

        <div className="user-box">
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="user-box"
          >
            <option value="">Select Education</option>
            {educations.map((education, index) => (
              <option key={index} value={education}>
                {education}
              </option>
            ))}
          </select>
          {educationError && (
            <label className="errorLabel">{educationError}</label>
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

export default JobSeekerSignUpForm;

import { useState } from "react";
import "./SignUpForm.css";
import {
  BrowserRouter as Routers,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function SignUpForm() {
  const [formData, setFormData] = useState<Props>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    let hasError = false;

    if (formData.firstName === "") {
      setFirstNameError("Please enter your first name");
      hasError = true;
    } else if (!/^[a-zA-Z ]*$/.test(formData.firstName)) {
      setFirstNameError("Please enter a valid first name");
      hasError = true;
    }

    if (formData.lastName === "") {
      setLastNameError("Please enter your last name");
      hasError = true;
    } else if (!/^[a-zA-Z ]*$/.test(formData.lastName)) {
      setLastNameError("Please enter a valid last name");
      hasError = true;
    }

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
      setPasswordError("Password must be 8 character or longer");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Register failed.");
      }

      const data = await response.json();
      console.log("Register successful:", data);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-box">
      <h2>Create an Account</h2>
      <form noValidate>
        <div className="user-box">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter first name here"
            onChange={handleChange}
            className={"user-box"}
          />
          <label className="errorLabel">{firstNameError}</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter last name here"
            onChange={handleChange}
            className={"user-box"}
          />
          <label className="errorLabel">{lastNameError}</label>
        </div>
        <div className="user-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email address here"
            onChange={handleChange}
            className={"user-box"}
          />

          <label className="errorLabel">{emailError}</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter password here"
            onChange={handleChange}
            className={"user-box"}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <input
          onClick={handleSubmit}
          className={"inputButton"}
          type="button"
          value={"Sign Up"}
        />
        <div className="login-text-box">
          <p>Already have an account?&nbsp;</p>
          <a id="login-text" href="/login">
            Login
          </a>
          <p>&nbsp;now!</p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;

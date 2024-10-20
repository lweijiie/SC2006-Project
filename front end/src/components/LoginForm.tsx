import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";

interface Props {
  email: string;
  password: string;
}

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
}

interface LoginFormProps {
  onLogin: (userProfile: UserProfile) => void; // Pass user profile to parent
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [formData, setFormData] = useState<Props>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile.");
      }

      const data = await response.json();
      return data.user; // Expect the user object containing firstName, lastName, email, and industry
    } catch (err: any) {
      throw new Error(
        err.message || "An error occurred while fetching the profile."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    let hasError = false;

    // Validate email and password
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

    if (hasError) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Perform login request
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      const userId = data.userId; // Assuming the userId is returned in the login response

      // Fetch the user profile after login
      const userProfile = await fetchUserProfile(userId);

      // Pass user profile to parent (App.tsx)
      onLogin(userProfile);

      // Navigate to the home page after successful login and profile fetch
      navigate("/");
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="user-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address here"
            className={"user-box"}
            required
          />
          {emailError && <label className="errorLabel">{emailError}</label>}
        </div>

        <div className="user-box">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password here"
            className={"user-box"}
            required
          />
          {passwordError && (
            <label className="errorLabel">{passwordError}</label>
          )}
        </div>

        {error && <p className="errorLabel">{error}</p>}
        <button type="submit" className="inputButton" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        <div className="sign-up-text-box">
          <p>Not have an account?&nbsp;</p>
          <a id="sign-up-text" href="/sign-up">
            Sign Up
          </a>
          <p>&nbsp;now!</p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

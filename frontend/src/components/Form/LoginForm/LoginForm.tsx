import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import {
  API_BASE_URL,
  ERROR_TEXT_FIELD_MESSAGE,
  NAV_LINKS,
} from "../../../constants";

interface LoginFormProps {
  onLogin: (userId: string, access_token: string) => void;
  loginType: "Job Seeker" | "Employer";
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loginType }) => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    user_type: "Job Seeker" | "Employer";
  }>({
    email: "",
    password: "",
    user_type: loginType,
  });

  const userPageType = loginType === "Job Seeker" ? "job-seeker" : "employer";
  const formTitle =
    loginType === "Job Seeker" ? "Login for Job Seeker" : "Login for Employer";
  const signUpLink = `${NAV_LINKS.base_link}/sign-up/${userPageType}`;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    let hasError = false;

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
      const userId = data.user_id;
      const access_token = data.access_token;

      onLogin(userId, access_token);

      // Navigate to the home page after successful login and profile fetch
      navigate(`/home/${userPageType}`);
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="user-box">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address here"
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
      </form>
      <div className="sign-up-text-box">
        <p>Don't have an account?&nbsp;</p>
        <a id="sign-up-text" href={signUpLink}>
          Sign Up
        </a>
        <p>&nbsp;now!</p>
      </div>
    </div>
  );
};

export default LoginForm;

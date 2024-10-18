import { useState } from "react";
import "./LoginForm.css";

interface Props {
  username: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<Props>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError("");
    setPasswordError("");

    // Validate username and password
    if (formData.username === "") {
      setUsernameError("Please enter your username");
      return;
    }
    if (formData.password === "") {
      setPasswordError("Please enter a password");
      return;
    }
    if (formData.password.length < 8) {
      setPasswordError("Password must be 8 characters or longer");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
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
      console.log("Login successful:", data);
      // You can redirect the user or save the token here
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username here"
            className={"user-box"}
            required
          />
          {usernameError && (
            <label className="errorLabel">{usernameError}</label>
          )}
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

        <div className="sign-up-box">
          <p>Not have an account?&nbsp;</p>
          <a id="sign-up-text" href="/sign-up/">
            Sign Up
          </a>
          <p>&nbsp;now!</p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

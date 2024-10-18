import { useState } from "react";
import "./LoginForm.css";

interface Props {
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<Props>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
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
    setEmailError("");
    setPasswordError("");

    // Validate email and password
    if (formData.email === "") {
      setEmailError("Please enter your email");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      setEmailError("Please enter a valid email address");
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

        <div className="signup-box">
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

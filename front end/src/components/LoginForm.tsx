import { useState } from "react";
import "./LoginForm.css";
import {
  BrowserRouter as Routers,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [emailError, setEmailError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [passwordError, setPasswordError] = useState("");
  //  const navigate = useNavigate();

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("please enter a valid email address");
    }
    if ("" === password) {
      setPasswordError("Please enter a password");
    } else if (password.length < 7) {
      setPasswordError("Password must be 8 character or longer");
    }

    return;
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form>
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
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <input
          onClick={onButtonClick}
          className={"inputButton"}
          type="button"
          value={"Log In"}
        />
        <div>
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

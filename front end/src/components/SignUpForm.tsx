import { useState } from "react";
import "./SignUpForm.css";
import {
  BrowserRouter as Routers,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  //  const navigate = useNavigate();

  const onButtonClick = () => {
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");

    if ("" === firstName) {
      setFirstNameError("Please enter your first name");
      return;
    }

    if ("" === lastName) {
      setLastNameError("Please enter your last name");
      return;
    }

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }
    if (password.length < 7) {
      setPasswordError("password must be 8 character or longer");
      return;
    }

    if (!/^[a-zA-Z ]*$/.test(firstName)) {
      setFirstNameError("please enter a valid first name");
    }

    if (!/^[a-zA-Z ]*$/.test(lastName)) {
      setLastNameError("please enter a valid last name");
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("please enter a valid email address");
      return;
    }

    if (email) {
      return (
        <>
          {
            <Routers>
              {
                <Routes>
                  <Route path="/home/"></Route>
                </Routes>
              }
            </Routers>
          }
        </>
      );
    } else {
      return <Navigate to="/Component/Login/Login" />;
    }
    //navigate("../Home")
  };

  return (
    <div className="sign-up-box">
      <h2>Sign Up</h2>
      <form>
        <div className="user-box">
          <input
            value={firstName}
            placeholder="Enter first name here"
            onChange={(ev) => setFirstName(ev.target.value)}
            className={"user-box"}
          />
          <label className="errorLabel">{firstNameError}</label>
        </div>
        <div className="user-box">
          <input
            value={lastName}
            placeholder="Enter last name here"
            onChange={(ev) => setLastName(ev.target.value)}
            className={"user-box"}
          />
          <label className="errorLabel">{lastNameError}</label>
        </div>
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
          value={"Sign Up"}
        />
      </form>
    </div>
  );
}

export default SignUpForm;

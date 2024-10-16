import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <Navbar isSignedIn={false} />
    <LoginForm />
  </React.StrictMode>,
  document.getElementById("root")
);

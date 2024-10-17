import React from "react";
import ReactDOM from "react-dom";
import SignUpForm from "../components/SignUpForm";
import Navbar from "../components/Navbar";

ReactDOM.render(
  <React.StrictMode>
    <Navbar isSignedIn={false} />
    <SignUpForm></SignUpForm>
  </React.StrictMode>,
  document.getElementById("root")
);

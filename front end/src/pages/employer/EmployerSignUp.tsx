import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.svg";
import EmployerSignUpForm from "../../components/form/EmployerSignUpForm";

const EmployerSignUp: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/"); // Navigate back to the landing page
  };
  return (
    <div>
      <EmployerSignUpForm />
      <img
        src={logo}
        alt="Go Back"
        onClick={handleGoBack}
        style={{ cursor: "pointer", marginTop: "15px" }}
      />
    </div>
  );
};

export default EmployerSignUp;

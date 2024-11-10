import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../components/Button/GoBackButton";
import Logo from "../../components/Logo/Logo";
import EmployerSignUpForm from "../../components/Form/SignUpForm/EmployerSignUpForm";


const EmployerSignUp: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/"); // Navigate back to the landing page
  };
  return (
    <div>
      <Logo />
      <GoBackButton />
      <EmployerSignUpForm />
    </div>
  );
};

export default EmployerSignUp;

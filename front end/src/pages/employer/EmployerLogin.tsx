import React from "react";
import LoginForm from "../../components/Form/LoginForm"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg"; // Adjust the import path as necessary

const EmployerLogin: React.FC<{ onLogin: (userId: string) => void }> = ({
  onLogin,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the landing page
  };

  return (
    <div>
      <LoginForm onLogin={onLogin} loginType="Employer" />
      <img
        src={logo}
        alt="Go Back"
        onClick={handleGoBack}
        style={{ cursor: "pointer", marginTop: "15px" }}
      />
    </div>
  );
};

export default EmployerLogin;

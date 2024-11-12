import React from "react";
import LoginForm from "../../components/Form/LoginForm/LoginForm";
import Logo from "../../components/Logo/Logo";
import GoBackButton from "../../components/Button/GoBackButton";
import "../../pages/styles/LoginPage.css";

const EmployerLogin: React.FC<{
  onLogin: (userId: string, access_token: string) => void;
}> = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="back-button">
          <GoBackButton />
        </div>
        <LoginForm onLogin={onLogin} loginType="Job Seeker" />
      </div>
      <div className="login-image-section" />
    </div>
  );
};

export default EmployerLogin;

import React from "react";
import LoginForm from "../../components/Form/LoginForm/LoginForm"; // Adjust the import path as necessary
import Logo from "../../components/Logo/Logo";
import GoBackButton from "../../components/Button/GoBackButton";

const EmployerLogin: React.FC<{
  onLogin: (userId: string, access_token: string) => void;
}> = ({ onLogin }) => {
  return (
    <div>
      <Logo />
      <GoBackButton />
      <LoginForm onLogin={onLogin} loginType="Employer" />
    </div>
  );
};

export default EmployerLogin;

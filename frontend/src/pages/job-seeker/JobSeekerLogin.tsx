import React from "react";
import LoginForm from "../../components/Form/LoginForm/LoginForm"; // Adjust the import path as necessary
import GoBackButton from "../../components/Button/GoBackButton";
import Logo from "../../components/Logo/Logo";

const JobSeekerLogin: React.FC<{
  onLogin: (userId: string, access_token: string) => void;
}> = ({ onLogin }) => {
  return (
    <div>
      <Logo />
      <GoBackButton />
      <LoginForm onLogin={onLogin} loginType="Job Seeker" />
    </div>
  );
};

export default JobSeekerLogin;

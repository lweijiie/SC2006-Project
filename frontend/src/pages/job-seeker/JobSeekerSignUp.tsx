import React from "react";
import JobSeekerSignUpForm from "../../components/Form/SignUpForm/JobSeekerSignUpForm";
import GoBackButton from "../../components/Button/GoBackButton";
import "../../pages/styles/LoginPage.css";
import Logo from "../../components/Logo/Logo";

const JobSeekerSignUp: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="back-button">
          <GoBackButton />
        </div>
        <JobSeekerSignUpForm />
      </div>
    </div>
  );
};

export default JobSeekerSignUp;

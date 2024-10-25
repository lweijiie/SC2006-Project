import React from "react";
import { useNavigate } from "react-router-dom";
import JobSeekerSignUpForm from "../../components/Form/JobSeekerSignUpForm";
import logo from "../../assets/logo.svg";
import { NAV_LINKS } from "../../constants";

const JobSeekerSignUp: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(NAV_LINKS.HOME);
  };
  return (
    <div>
      <JobSeekerSignUpForm />
      <img
        src={logo}
        alt="Go Back"
        onClick={handleGoBack}
        style={{ cursor: "pointer", marginTop: "15px" }}
      />
    </div>
  );
};

export default JobSeekerSignUp;

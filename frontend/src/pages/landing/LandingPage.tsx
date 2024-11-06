import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Ensure to create a corresponding CSS file for styles
import { NAV_LINKS } from "../../constants";
import Logo from "../../components/Logo/Logo";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleJobSeekerLogin = () => {
    navigate(NAV_LINKS.job_seeker_login);
  };

  const handleEmployerLogin = () => {
    navigate(NAV_LINKS.employer_login);
  };

  return (
    <div className="landing-page">
      <div className="header">
        <h1>Welcome to </h1>
        <Logo></Logo>
      </div>
      <div className="content">
        <p>Please choose your login type:</p>
        <div className="login-options">
          <button onClick={handleJobSeekerLogin} className="login-button">
            Job Seeker
          </button>
          <button onClick={handleEmployerLogin} className="login-button">
            Employer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

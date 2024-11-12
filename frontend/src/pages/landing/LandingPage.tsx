import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Ensure to create a corresponding CSS file for styles
import { NAV_LINKS } from "../../constants"; // Assuming NAV_LINKS holds the paths
import Logo from "../../components/Logo/Logo"; // Import the Logo component
import NavbarLanding from "../../components/Navbar/NavbarLanding"; // Import NavbarLanding

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to the appropriate login page
  const handleJobSeekerLogin = () => {
    console.log('Navigating to job seeker portal');
    navigate(NAV_LINKS.job_seeker_login);
  };

  const handleEmployerLogin = () => {
    console.log('Navigating to employer portal');
    navigate(NAV_LINKS.employer_login);
  };

  return (
    <div className="landing-page">
      <NavbarLanding />
      <div className="header">
        <h1>Welcome to </h1>
        <Logo />
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

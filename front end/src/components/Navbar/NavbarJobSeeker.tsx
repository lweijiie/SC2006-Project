import React from "react";
import "./Navbar.css";
import { NAV_LINKS } from "../../constants";

interface JobSeekerProps {
  firstName: string;
  lastName: string;
}

const NavbarJobSeeker: React.FC<JobSeekerProps> = ({ firstName, lastName }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <a className="navbar-brand" href={NAV_LINKS.JOB_SEEKER_HOME}>
          <img src="../assets/logo.svg" alt="CareerPathNow" />
        </a>
        <div className="navbar-items">
          <a className="navbar-item" href={NAV_LINKS.JOB_SEEKER_HOME}>
            Home
          </a>
          <a className="navbar-item" href={NAV_LINKS.JOB_SEEKER_JOB_SEARCH}>
            Jobs
          </a>
          <a className="navbar-item" href={NAV_LINKS.JOB_SEEKER_FIND_COURSE}>
            Courses
          </a>
        </div>
      </div>
      <div className="navbar-right">
        <span className="welcome-message">
          Welcome, {firstName} {lastName}
        </span>
        <a className="profile-button" href={NAV_LINKS.JOB_SEEKER_PROFILE}>
          Profile
        </a>
        <input type="button" className="menu-dropdown" />
      </div>
    </div>
  );
};

export default NavbarJobSeeker;

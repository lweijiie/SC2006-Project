import React from "react";
import "./Navbar.css";

interface JobSeekerProps {
  firstName: string;
  lastName: string;
}

const NavbarJobSeeker: React.FC<JobSeekerProps> = ({ firstName, lastName }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <a className="navbar-brand" href="/home">
          <img src="../assets/logo.svg" alt="CareerPathNow" />
        </a>
        <div className="navbar-items">
          <a className="navbar-item" href="/home">
            Home
          </a>
          <a className="navbar-item" href="/jobs">
            Find Jobs
          </a>
          <a className="navbar-item" href="/applications">
            My Applications
          </a>
          <a className="navbar-item" href="/courses">
            Courses
          </a>
          <a className="navbar-item" href="/internships">
            Internships
          </a>
          <a className="navbar-item" href="/about">
            About
          </a>
        </div>
      </div>
      <div className="navbar-right">
        <span className="welcome-message">
          Welcome, {firstName} {lastName}
        </span>
        <a className="profile-button" href="/profile">
          Profile
        </a>
        <input type="button" className="menu-dropdown" />
      </div>
    </div>
  );
};

export default NavbarJobSeeker;

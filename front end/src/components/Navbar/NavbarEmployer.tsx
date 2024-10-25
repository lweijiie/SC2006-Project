import React from "react";
import "./Navbar.css";
import { NAV_LINKS } from "../../constants";

const NavbarEmployer: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <a className="navbar-brand" href={NAV_LINKS.EMPLOYER_HOME}>
          <img src="../assets/logo.svg" alt="CareerPathNow" />
        </a>
        <div className="navbar-items">
          <a className="navbar-item" href={NAV_LINKS.EMPLOYER_HOME}>
            Home
          </a>
          <a className="navbar-item" href={NAV_LINKS.EMPLOYER_JOB_POST}>
            Jobs Post
          </a>
        </div>
      </div>
      <div className="navbar-right">
        <a className="profile-button" href={NAV_LINKS.EMPLOYER_PROFILE}>
          Profile
        </a>
        <input type="button" className="menu-dropdown" />
      </div>
    </div>
  );
};

export default NavbarEmployer;

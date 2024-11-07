import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../constants";

interface NavItem {
  label: string;
  link: string;
}

interface NavbarProps {
  homeLink: string;
  navLeftItems: NavItem[];
  navRightItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({
  homeLink,
  navLeftItems,
  navRightItems,
}) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    navigate(NAV_LINKS.home);
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <a className="navbar-brand" href={homeLink}>
          <img src="../assets/logo.svg" alt="CareerPathNow Logo" />
        </a>
        <div className="navbar-items">
          {navLeftItems.map((item, index) => (
            <a key={index} className="navbar-item" href={item.link}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-items">
          {navRightItems.map((item, index) => (
            <a key={index} className="navbar-item" href={item.link}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="log-out-button">
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

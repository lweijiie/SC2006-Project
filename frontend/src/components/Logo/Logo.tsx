import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <Link to="/">
      <img className="logo" src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;

import "./Navbar.css";

interface Props {
  isSignedIn?: boolean;
}
const Navbar = ({ isSignedIn = true }: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <a className="navbar-brand" href="/home/">
          <img src="../assets/logo.svg" alt="CareerPathNow" />
        </a>
        <div className="navbar-items">
          <a className="navbar-item" href="/home/">
            Home
          </a>
          <a className="navbar-item" href="#">
            Employer
          </a>
          <a className="navbar-item" href="#">
            Candidates
          </a>
          <a className="navbar-item" href="#">
            Courses
          </a>
          <a className="navbar-item" href="#">
            Internships
          </a>
          <a className="navbar-item" href="/about/">
            About
          </a>
        </div>
      </div>
      {isSignedIn === true ? (
        <div className="navbar-right">
          <a className="profile-button" href="/profile/">
            Profile
          </a>
          <input type="button" className="menu-dropdown" />
        </div>
      ) : (
        <div className="navbar-right">
          <a className="navbar-item" href="/login/">
            Login
          </a>
          <a className="sign-up-button" href="/sign-up/">
            Sign Up
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;

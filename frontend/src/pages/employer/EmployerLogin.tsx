import React from "react";
import LoginForm from "../../components/Form/LoginForm/LoginForm"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg"; // Adjust the import path as necessary

const EmployerLogin: React.FC<{
  onLogin: (userId: string, access_token: string) => void;
}> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Navigate back to the landing page
  };

  const handleLogin = (userId: string, access_token: string) => {
    // Store userId and access_token in localStorage
    localStorage.setItem("user_id", userId);
    localStorage.setItem("access_token", access_token);

    // Call the parent onLogin function to update the app state
    onLogin(userId, access_token);

    // Redirect to the employer home page (or any other page you want after login)
    navigate("/employer/home");
  };

  return (
    <div>
      {/* Pass the custom handleLogin function to LoginForm */}
      <LoginForm onLogin={handleLogin} loginType="Employer" />
      <img
        src={logo}
        alt="Go Back"
        onClick={handleGoBack}
        style={{ cursor: "pointer", marginTop: "15px" }}
      />
    </div>
  );
};

export default EmployerLogin;

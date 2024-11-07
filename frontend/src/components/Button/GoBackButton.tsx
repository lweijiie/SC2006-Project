import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button onClick={handleGoBack} className="go-back-button">
      ← Go Back
    </button>
  );
};

export default GoBackButton;

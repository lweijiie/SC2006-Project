// src/pages/employer/EmployerPostInternship.tsx
import React from "react";
import EmployerPostInternshipForm from "../../components/Form/InternshipForm/EmployerPostInternshipForm";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";

const EmployerPostInternship: React.FC = () => {
  const handlePostSuccess = () => {
    alert("Internship posted successfully!");
    // Navigate to another page or refresh the list later
  };

  return (
    <div>
      <NavbarEmployer />
      <EmployerPostInternshipForm onPostSuccess={handlePostSuccess} />
    </div>
  );
};

export default EmployerPostInternship;

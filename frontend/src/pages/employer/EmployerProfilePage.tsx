import React from "react";
import EmployerProfileUpdateForm from "../../components/Form/ProfileUpdateForm/EmployerProfileUpdateForm";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";

const EmployerProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <NavbarEmployer />
      <EmployerProfileUpdateForm />
    </div>
  );
};

export default EmployerProfilePage;
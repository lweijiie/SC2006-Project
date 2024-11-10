import React from "react";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";
import EmployerEditInternshipForm from "../../components/Form/InternshipForm/EmployerEditInternshipForm";

const EmployerEditInternship: React.FC = () => {
  return (
    <div>
      <NavbarEmployer />
      <EmployerEditInternshipForm />
    </div>
  );
};

export default EmployerEditInternship;

// src/pages/employer/EmployerPostInternship.tsx
import React from "react";
import EmployerPostInternshipForm from "../../components/Form/InternshipForm/EmployerPostInternshipForm";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";
import { ChakraProvider } from '@chakra-ui/react'


const EmployerPostInternship: React.FC = () => {
  const handlePostSuccess = () => {
    alert("Internship posted successfully!");
    // Navigate to another page or refresh the list later
  };

  return (
    <ChakraProvider>
      <NavbarEmployer />
      <EmployerPostInternshipForm onPostSuccess={handlePostSuccess} />
    </ChakraProvider>
  );
};

export default EmployerPostInternship;

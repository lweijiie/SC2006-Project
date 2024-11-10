import React from "react";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";
import EmployerEditInternshipForm from "../../components/Form/InternshipForm/EmployerEditInternshipForm";
import { ChakraProvider } from '@chakra-ui/react'

const EmployerEditInternship: React.FC = () => {
  return (
    <ChakraProvider>
      <NavbarEmployer />
      <EmployerEditInternshipForm />
    </ChakraProvider>
  );
};

export default EmployerEditInternship;

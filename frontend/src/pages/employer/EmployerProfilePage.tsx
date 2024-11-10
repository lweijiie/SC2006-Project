import React from "react";
import EmployerProfileUpdateForm from "../../components/Form/ProfileUpdateForm/EmployerProfileUpdateForm";
import { ChakraProvider } from '@chakra-ui/react'
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";

const EmployerProfilePage: React.FC = () => {
  return (
    <ChakraProvider>
      <NavbarEmployer />
      <EmployerProfileUpdateForm />
    </ChakraProvider>
  );
};

export default EmployerProfilePage;
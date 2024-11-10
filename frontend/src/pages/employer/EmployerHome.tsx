import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";

const EmployerHome: React.FC = () => {
  return (
    <ChakraProvider>
      <NavbarEmployer />
    </ChakraProvider>
  );
};

export default EmployerHome;

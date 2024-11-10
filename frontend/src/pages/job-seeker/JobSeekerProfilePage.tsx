import React from "react";
import JobSeekerProfileUpdateForm from "../../components/Form/ProfileUpdateForm/JobSeekerProfileUpdateForm";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import { ChakraProvider } from '@chakra-ui/react'

const JobSeekerProfilePage: React.FC = () => {
  return (
    <ChakraProvider>
      <NavbarJobSeeker />
      <JobSeekerProfileUpdateForm />
    </ChakraProvider>
  );
};

export default JobSeekerProfilePage;

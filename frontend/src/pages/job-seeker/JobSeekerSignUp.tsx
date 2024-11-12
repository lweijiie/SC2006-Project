import React from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import JobSeekerSignUpForm from "../../components/Form/SignUpForm/JobSeekerSignUpForm";
import Logo from "../../components/Logo/Logo";
import { NAV_LINKS } from "../../constants";

const JobSeekerSignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(NAV_LINKS.home); 
  };

  const handleLoginRedirect = () => {
    navigate(NAV_LINKS.job_seeker_login); // Redirect to Job Seeker login page
  };

  return (
    <ChakraProvider>
      <Flex
        height="100vh" // Force to full viewport height
        direction="column"
        align="center"
        justify="space-between" // Distribute items top-to-bottom to avoid overflow
        bgImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../assets/CBD.jpg')"
        bgSize="cover"
        bgPosition="center"
        overflowY="auto" // Allow scrolling if necessary
        padding={4} // Add some padding to avoid cutoff edges
      >
        {/* Logo and Back Button */}
        <Stack spacing={3} align="center">
          <Logo />
          <Button variant="link" color="gray.300" onClick={handleGoBack}>
            Go Back
          </Button>
        </Stack>

        {/* Sign-Up Form */}
        <Box
          p={6} // Adjust padding to make it compact
          bg="whiteAlpha.900"
          borderRadius="lg"
          boxShadow="md"
          width="100%"
          maxW="sm"
          color="gray.800"
        >
          <JobSeekerSignUpForm />
          <Text mt={4} textAlign="center" color="gray.600">
            Already have an account?{" "}
            <Button variant="link" color="blue.500" onClick={handleLoginRedirect}>
              Login
            </Button>{" "}
            now!
          </Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default JobSeekerSignUp;

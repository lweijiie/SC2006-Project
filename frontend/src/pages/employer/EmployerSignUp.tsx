import React from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Stack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import EmployerSignUpForm from "../../components/Form/SignUpForm/EmployerSignUpForm";
import { NAV_LINKS } from "../../constants";

const EmployerSignUp: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(NAV_LINKS.home); // Update with the route to your landing page
  };

  const handleLoginRedirect = () => {
    navigate(NAV_LINKS.employer_login); // Redirect to Employer login page
  };

  return (
    <ChakraProvider>
      <Flex
        minH="100vh"
        direction="column"
        align="center"
        justify="center"
        overflow="auto"
        bgImage="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../assets/CBD.jpg')"
        bgSize="cover"
        bgPosition="center"
      >
        <Stack spacing={6} align="center" mb={6}>
          <Logo />
        </Stack>

        <Button variant="link" color="gray.300" onClick={handleGoBack}>
          Go Back
        </Button>

        <Box
          p={10}
          bg="whiteAlpha.900"
          borderRadius="lg"
          boxShadow="sm"
          maxW="sm"
          width="100%"
          mx="auto"
          color="gray.800"
        >
          <EmployerSignUpForm />
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

export default EmployerSignUp;

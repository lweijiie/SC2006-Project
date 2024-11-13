import React from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import LoginForm from "../../components/Form/LoginForm/LoginForm";
import Logo from "../../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { NAV_LINKS } from "../../constants"; // Assuming NAV_LINKS holds the paths
import "../../style.css"

const JobSeekerLogin: React.FC<{
  onLogin: (userId: string, access_token: string) => void;
}> = ({ onLogin }) => {

  const navigate = useNavigate();
  const handleJobSeekerLogin = () => {
    navigate(NAV_LINKS.job_seeker_login); // Redirect to job seeker login
  };
  
  const handleEmployerLogin = () => {
    navigate(NAV_LINKS.employer_login); // Redirect to employer login
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

        <HStack spacing={4} mb={4}>
          <Button colorScheme="gray" variant="solid" onClick={handleJobSeekerLogin}>
            Job Seeker Login
          </Button>
          <Button colorScheme="blue" variant="solid" onClick={handleEmployerLogin}>
            Employer Login
          </Button>
        </HStack>

        <Box
          p={10} // Ample padding for comfortable spacing
          bg="whiteAlpha.900"
          borderRadius="lg"
          boxShadow="sm" // Softer shadow for depth
          maxW="sm"
          width="100%"
          mx="auto"
          color="gray.800"
        >
          <LoginForm onLogin={onLogin} loginType="Job Seeker" />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default JobSeekerLogin;

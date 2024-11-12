import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { API_BASE_URL, NAV_LINKS } from "../../../constants";
import { validateEmail, validatePassword } from "../../../utils/errorValidation";

function EmployerSignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError(null);

    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register-employer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }

      toast({
        title: "Registration successful.",
        description: "Please login to continue.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate(NAV_LINKS.employer_login);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={4}>
        <FormControl id="email" isInvalid={!!emailError}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address here"
            focusBorderColor="blue.500"
            size="lg"
            bg="gray.50"
            required
          />
          {emailError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {emailError}
            </Text>
          )}
        </FormControl>
        <FormControl id="password" isInvalid={!!passwordError}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password here"
            focusBorderColor="blue.500"
            size="lg"
            bg="gray.50"
            required
          />
          {passwordError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {passwordError}
            </Text>
          )}
        </FormControl>
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          isLoading={loading}
          loadingText="Signing up..."
          fontWeight="bold"
        >
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
}

export default EmployerSignUpForm;

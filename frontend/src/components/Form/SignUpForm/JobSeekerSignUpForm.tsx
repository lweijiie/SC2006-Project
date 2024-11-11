import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  API_BASE_URL,
  INDUSTRY_LIST,
  EDUCATION_LIST,
  NAV_LINKS,
} from "../../../constants";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateIndustry,
  validateEducation,
} from "../../../utils/errorValidation";

function JobSeekerSignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    industry: "",
    education: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [educationError, setEducationError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setIndustryError("");
    setEducationError("");

    const firstNameValidation = validateFirstName(formData.firstName);
    const lastNameValidation = validateLastName(formData.lastName);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const industryValidation = validateIndustry(formData.industry);
    const educationValidation = validateEducation(formData.education);

    setFirstNameError(firstNameValidation);
    setLastNameError(lastNameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setIndustryError(industryValidation);
    setEducationError(educationValidation);

    if (firstNameValidation || lastNameValidation || emailValidation || passwordValidation || industryValidation || educationValidation) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register-jobseeker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          industry: formData.industry,
          education: formData.education,
      }),

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

      navigate(NAV_LINKS.job_seeker_login);
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={4}>
        <FormControl id="firstName" isInvalid={!!firstNameError}>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name here"
            focusBorderColor="blue.500"
            bg="gray.50"
            required
          />
          {firstNameError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {firstNameError}
            </Text>
          )}
        </FormControl>
        <FormControl id="lastName" isInvalid={!!lastNameError}>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name here"
            focusBorderColor="blue.500"
            bg="gray.50"
            size="md"
            required
          />
          {lastNameError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {lastNameError}
            </Text>
          )}
        </FormControl>
        <FormControl id="email" isInvalid={!!emailError}>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address here"
            focusBorderColor="blue.500"
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
            bg="gray.50"
            required
          />
          {passwordError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {passwordError}
            </Text>
          )}
        </FormControl>
        <FormControl id="industry" isInvalid={!!industryError}>
          <FormLabel>Industry</FormLabel>
          <Select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Select Industry"
            focusBorderColor="blue.500"
            bg="gray.50"
          >
            {INDUSTRY_LIST.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </Select>
          {industryError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {industryError}
            </Text>
          )}
        </FormControl>
        <FormControl id="education" isInvalid={!!educationError}>
          <FormLabel>Education</FormLabel>
          <Select
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Select Education"
            focusBorderColor="blue.500"
            bg="gray.50"
          >
            {EDUCATION_LIST.map((education, index) => (
              <option key={index} value={education}>
                {education}
              </option>
            ))}
          </Select>
          {educationError && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {educationError}
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

export default JobSeekerSignUpForm;

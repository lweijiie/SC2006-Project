import { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, NAV_LINKS } from "../../../constants";
import { validateEmail, validatePassword } from "../../../utils/errorValidation";
import "../Form.css";


interface LoginFormProps {
  onLogin: (userId: string, access_token: string) => void;
  loginType: "Job Seeker" | "Employer";
}

export default function LoginForm({ onLogin, loginType }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: loginType,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const userPageType = loginType === "Job Seeker" ? "job-seeker" : "employer";
  const signUpLink = `${NAV_LINKS.base_link}/sign-up/${userPageType}`;

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
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      const userId = data.user_id;
      const access_token = data.access_token;

      onLogin(userId, access_token);
      navigate(`/home/${userPageType}`);
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
<Flex p={10} flex={1} align="center" justify="center">
  <Stack spacing={8} w="full" maxW="md">
    <Heading fontSize="xl" color="gray.700" fontWeight="bold" textAlign="center">
      {loginType} Login
    </Heading>
    <form onSubmit={handleSubmit}>
      <FormControl id="email" isInvalid={!!emailError}>
        <FormLabel fontWeight="medium" color="gray.600">
          Email address
        </FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address here"
          focusBorderColor="blue.500"
          bg="gray.50" // Light gray background for inputs
          borderRadius="md"
          size="md"
          fontSize="sm"
          fontWeight="medium"
          required
        />
        {emailError && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {emailError}
          </Text>
        )}
      </FormControl>
      <FormControl id="password" mt={4} isInvalid={!!passwordError}>
        <FormLabel fontWeight="medium" color="gray.600">
          Password
        </FormLabel>
        <InputGroup>
          <Input
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password here"
            focusBorderColor="blue.500"
            bg="gray.50" // Light gray background for inputs
            borderRadius="md"
            size="md"
            fontSize="sm"
            fontWeight="medium"
            required
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {passwordError && (
          <Text color="red.500" fontSize="sm" mt={1}>
            {passwordError}
          </Text>
        )}
      </FormControl>
      {error && (
        <Text color="red.500" mt={2} fontSize="sm">
          {error}
        </Text>
      )}
      <Stack spacing={5} mt={6}>
        <Checkbox colorScheme="blue">Remember me</Checkbox>
        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          fontWeight="bold"
          isLoading={loading}
          loadingText="Logging in..."
          py={6} // Increased padding for button
        >
          Sign in
        </Button>
      </Stack>
    </form>
    <Text fontSize="sm" color="gray.600" mt={4} textAlign="center">
      Don't have an account?{" "}
      <Link color="blue.500" href={signUpLink}>
        Sign Up
      </Link>{" "}
      now!
    </Text>
  </Stack>
</Flex>
  );
}

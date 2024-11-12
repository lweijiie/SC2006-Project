import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FetchEmployerInternships from "../../services/FetchEmployerInternships";
import { MongoInternshipData } from "../../store/auth/interface";
import Card from "../../components/Card/Card";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";
import { ChakraProvider, Box, Text, Button, Spinner, Flex } from "@chakra-ui/react";

const EmployerInternshipList: React.FC = () => {
  const [internships, setInternships] = useState<MongoInternshipData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const employer_id = localStorage.getItem("user_id") || "";
  const access_token = localStorage.getItem("access_token") || "";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const data = await FetchEmployerInternships(employer_id, access_token);
        setInternships(data.internships);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch internships."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [employer_id, access_token]);

  const handleEditClick = (internshipId: string) => {
    navigate(`/employer/edit-internship/${internshipId}`);
  };

  return (
    <ChakraProvider>
      <NavbarEmployer />
      <Box p={4}>
        {loading ? (
          <Flex justify="center" align="center" minH="50vh">
            <Spinner size="lg" />
            <Text ml={4}>Loading internships...</Text>
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" minH="50vh">
            <Text color="red.500" fontSize="lg">
              Error: {error}
            </Text>
          </Flex>
        ) : internships.length === 0 ? (
          <Flex justify="center" align="center" minH="50vh">
            <Text fontSize="lg">No internships found.</Text>
          </Flex>
        ) : (
          <Box className="card-list" display="flex" flexWrap="wrap" justifyContent="center">
            {internships.map((internship) => (
              <Box key={internship._id} m={2} textAlign="center">
                <Card
                  title={internship.title}
                  details={{
                    description: internship.description,
                    requirements: Array.isArray(internship.requirements)
                      ? internship.requirements.join(", ")
                      : internship.requirements,
                    location: internship.location,
                    duration: internship.duration,
                    salary: internship.salary || "Not specified",
                  }}
                  link=""
                />
                <Button
                  mt={2}
                  colorScheme="blue"
                  onClick={() => handleEditClick(internship._id)}
                  size="sm"
                >
                  Edit
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default EmployerInternshipList;

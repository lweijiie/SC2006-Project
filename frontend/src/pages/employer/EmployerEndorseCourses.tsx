import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import FetchAllCourses from "../../services/FetchAllCourses";
import { ChakraProvider, IconButton, useToast, Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";

const EmployerEndorseCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const fetchedCourses = await FetchAllCourses(accessToken);
        setCourses(fetchedCourses);
        setError(null);
      } catch (error) {
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEndorse = () => {
    toast({
      title: "Course endorsed successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const truncateText = (text: string, lines: number): string => {
    const lineHeight = 1.4;
    const maxCharsPerLine = 20;
    const maxChars = maxCharsPerLine * lines * lineHeight;
    return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
  };

  const getCourseDetails = (course: any) => ({
    description: truncateText(course.objective, 4),
    cost: `$${course.totalCostOfTrainingPerTrainee}`,
    duration: `${course.lengthOfCourseDurationHour} hours`,
    provider: course.trainingProvider.name,
    deliveryMethods: course.methodOfDeliveries.map((m: any) => m.description).join(", "),
    category: course.category.description,
    areasOfTraining: course.areaOfTrainings.map((a: any) => a.description).join(", "),
    entryRequirements: course.entryRequirement,
  });

  return (
    <ChakraProvider>
      <NavbarEmployer />
      <Box p={6} maxW="1200px" mx="auto">
        <Heading as="h2" size="lg" textAlign="center" mb={6} color="teal.600">
          Courses Available for Endorsement
        </Heading>

        {loading ? (
          <Flex justify="center" align="center" minH="50vh">
            <Spinner size="lg" />
            <Text ml={4}>Loading courses...</Text>
          </Flex>
        ) : error ? (
          <Flex justify="center" align="center" minH="50vh">
            <Text color="red.500" fontSize="lg">{error}</Text>
          </Flex>
        ) : (
          <Flex wrap="wrap" justify="center" gap={6}>
            {courses.map((course, index) => (
              <Box key={index} position="relative" width="300px">
                <IconButton
                  icon={<FaHeart />}
                  colorScheme="pink"
                  aria-label="Endorse Course"
                  onClick={handleEndorse}
                  size="sm"
                  position="absolute"
                  top={2}
                  right={2}
                  zIndex={1}
                />
                <Card
                  title={course.title}
                  details={getCourseDetails(course)}
                  link={course.url}
                />
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default EmployerEndorseCourses;

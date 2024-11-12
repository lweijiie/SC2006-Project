import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import FetchPersonalisedCourses from "../../services/FetchPersonalisedCourses";
import { CourseData } from "../../store/auth/interface";
import { NAV_LINKS } from "../../constants";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  Center,
} from "@chakra-ui/react";

const JobSeekerPersonalisedCourses: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");

        if (!accessToken || !userId) {
          throw new Error("Missing access token or user ID");
        }

        const fetchedCourses = await FetchPersonalisedCourses(
          userId,
          accessToken
        );
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("Failed to fetch personalized courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const truncateText = (text: string, lines: number): string => {
    const lineHeight = 1.4;
    const maxCharsPerLine = 20;
    const maxChars = maxCharsPerLine * lines * lineHeight;
    return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
  };

  const getCourseDetails = (course: CourseData) => ({
    description: truncateText(course.objective, 4),
    cost: `$${course.totalCostOfTrainingPerTrainee}`,
    duration: `${course.lengthOfCourseDurationHour} hours`,
    provider: course.trainingProvider.name,
    category: course.category.description,
    requirements: course.entryRequirement,
    deliveryMethods: course.methodOfDeliveries
      .map((method) => method.description)
      .join(", "),
    areasOfTraining: course.areaOfTrainings
      .map((area) => area.description)
      .join(", "),
  });

  return (
    <ChakraProvider>
      <NavbarJobSeeker />
      <Box p={6}>
        <Link to={NAV_LINKS.job_seeker_find_course}>
          <Button colorScheme="teal" mb={4}>Go to All Courses</Button>
        </Link>

        {loading ? (
          <Center mt={10}>
            <Spinner size="lg" color="teal.500" />
          </Center>
        ) : error ? (
          <Center mt={10}>
            <Box textAlign="center" color="red.500">
              <Text fontSize="lg">{error}</Text>
            </Box>
          </Center>
        ) : courses.length === 0 ? (
          <Center mt={10}>
            <Text fontSize="lg" color="gray.500">No personalized courses available.</Text>
          </Center>
        ) : (
          <Box className="card-list">
            {courses.map((course, index) => (
              <Card
                key={index}
                title={course.title}
                details={getCourseDetails(course)}
                link={course.url}
              />
            ))}
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default JobSeekerPersonalisedCourses;

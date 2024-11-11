import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Heading,
  IconButton,
  useToast,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";
import Slider from "react-slick";
import Card from "../../components/Card/Card";
import FetchAllCourses from "../../services/FetchAllCourses";
import FetchEmployerInternships from "../../services/FetchEmployerInternships";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmployerHome: React.FC = () => {
  const [courseChunks, setCourseChunks] = useState<any[][]>([]);
  const [internshipChunks, setInternshipChunks] = useState<any[][]>([]);
  const toast = useToast();
  const navigate = useNavigate();

  const employer_id = localStorage.getItem("user_id") || "";
  const access_token = localStorage.getItem("access_token") || "";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await FetchAllCourses(access_token);
        const chunkSize = 5;
        const chunks = [];
        for (let i = 0; i < fetchedCourses.length && i < chunkSize * 3; i += chunkSize) {
          chunks.push(fetchedCourses.slice(i, i + chunkSize));
        }
        setCourseChunks(chunks);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    const fetchInternships = async () => {
      try {
        const data = await FetchEmployerInternships(employer_id, access_token);
        const chunkSize = 5;
        const chunks = [];
        for (let i = 0; i < data.internships.length && i < chunkSize * 3; i += chunkSize) {
          chunks.push(data.internships.slice(i, i + chunkSize));
        }
        setInternshipChunks(chunks);
      } catch (error) {
        console.error("Failed to fetch internships:", error);
      }
    };

    fetchCourses();
    fetchInternships();
  }, [employer_id, access_token]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleEndorse = () => {
    toast({
      title: "Course endorsed successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditClick = (internshipId: string) => {
    navigate(`/employer/edit-internship/${internshipId}`);
  };

  return (
    <ChakraProvider>
      <Flex direction="column" minH="100vh" overflowY="auto">
        <NavbarEmployer />
        <Box p={6} maxW="1200px" mx="auto">
          {/* Course Slider */}
          <Heading as="h2" size="lg" mb={4} textAlign="center" color="teal.600">
            Featured Courses for Endorsement
          </Heading>
          <Slider {...sliderSettings}>
            {courseChunks.map((chunk, index) => (
              <Box key={index} className="course-slide" px={4}>
                <Flex gap="10px" justifyContent="center" flexWrap="wrap">
                  {chunk.map((course, courseIndex) => (
                    <Box key={courseIndex} position="relative">
                      <Card
                        title={course.title}
                        details={{
                          description: course.objective,
                          cost: `$${course.totalCostOfTrainingPerTrainee}`,
                          provider: course.trainingProvider?.name,
                          category: course.category?.description,
                        }}
                        link={course.url}
                      />
                      <IconButton
                        icon={<FaHeart />}
                        colorScheme="pink"
                        aria-label="Endorse Course"
                        onClick={handleEndorse}
                        size="sm"
                        position="absolute"
                        top="10px"
                        right="10px"
                        zIndex={1}
                      />
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Slider>

          {/* Internship Slider */}
          <Heading as="h2" size="lg" mt={10} mb={4} textAlign="center" color="teal.600">
            My Internships
          </Heading>
          <Slider {...sliderSettings}>
            {internshipChunks.map((chunk, index) => (
              <Box key={index} className="internship-slide" px={4}>
                <Flex gap="10px" justifyContent="center" flexWrap="wrap">
                  {chunk.map((internship, internshipIndex) => (
                    <Box key={internshipIndex} position="relative">
                      <Card
                        title={internship.title}
                        details={{
                          description: internship.description,
                          duration: internship.duration,
                          location: internship.location,
                          requirements: Array.isArray(internship.requirements)
                            ? internship.requirements.join(", ")
                            : internship.requirements,
                          salary: internship.salary || "Not specified",
                        }}
                        link=""
                      />
                      <Button
                        onClick={() => handleEditClick(internship._id)}
                        colorScheme="blue"
                        size="sm"
                        mt={2}
                        w="full"
                      >
                        Edit
                      </Button>
                    </Box>
                  ))}
                </Flex>
              </Box>
            ))}
          </Slider>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default EmployerHome;

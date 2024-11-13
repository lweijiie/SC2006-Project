import React, { useEffect, useState } from "react";
import { ChakraProvider, Heading, Flex, Box, Text, Button, Divider } from "@chakra-ui/react";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import Slider from "react-slick";
import Card from "../../components/Card/Card";
import FetchPersonalisedCourses from "../../services/FetchPersonalisedCourses";
import FetchAllJobs from "../../services/FetchAllJobs";
import { CourseData, InternshipData } from "../../store/auth/interface";
import { NAV_LINKS } from "../../constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../style.css"

const JobSeekerHome: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");
        const fetchedCourses = await FetchPersonalisedCourses(userId, accessToken);
        setCourses(fetchedCourses);
      } catch (err) {
        setError("Failed to fetch personalized courses.");
      }
    };

    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const fetchedInternships = await FetchAllJobs(token);
        setInternships(fetchedInternships);
      } catch (err) {
        setError("Failed to fetch job listings.");
      }
    };

    fetchCourses();
    fetchJobs();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <ChakraProvider>
      <Flex direction="column" minH="100vh" bg="gray.100" overflowY="auto">
        <NavbarJobSeeker />

        {/* Hero Section */}
        <Box as="section" textAlign="center" py={10} bg="teal.500" color="white">
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Your Career Path
          </Heading>
          <Text fontSize="lg" maxW="lg" mx="auto" mb={6}>
            Discover personalized courses and find internship opportunities to boost your career.
          </Text>
          <Button colorScheme="teal" variant="solid" size="lg" href={`${NAV_LINKS.job_seeker_find_course}`}>
            Explore More Courses
          </Button>
        </Box>

        <Box p={4} flex="1" maxW="1200px" mx="auto" overflowY="auto">
          {/* Personalized Courses Section */}
          <Heading as="h2" size="lg" mt={10} mb={4} textAlign="center" color="teal.600">
            Personalized Courses
          </Heading>
          <Divider mb={6} />
          <Box overflow="hidden" borderRadius="md" p={4} bg="white" boxShadow="md">
            <Slider {...sliderSettings}>
              {courses.map((course, index) => (
                <div key={index} className="slider-item">
                  <Card
                    title={course.title}
                    details={{
                      description: course.objective,
                      duration: `${course.lengthOfCourseDurationHour} hours`,
                      cost: `$${course.totalCostOfTrainingPerTrainee}`,
                      provider: course.trainingProvider.name,
                      category: course.category.description,
                    }}
                    link={course.url}
                  />
                </div>
              ))}
            </Slider>
          </Box>

          {/* Available Internships Section */}
          <Heading as="h2" size="lg" mt={10} mb={4} textAlign="center" color="teal.600">
            Available Internships
          </Heading>
          <Divider mb={6} />
          <Box overflow="hidden" borderRadius="md" p={4} bg="white" boxShadow="md">
            <Slider {...sliderSettings}>
              {internships.map((internship, index) => (
                <div key={index} className="slider-item">
                  <Card
                    title={internship.title}
                    details={{
                      description: internship.description,
                      duration: internship.duration,
                      location: internship.location,
                      requirements: Array.isArray(internship.requirements)
                        ? internship.requirements.join(", ")
                        : internship.requirements,
                      salary: internship.salary,
                    }}
                    link={`${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`}
                  />
                </div>
              ))}
            </Slider>
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default JobSeekerHome;

import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Heading,
  IconButton,
  useToast,
  Button,
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
        const courseChunks = [];
        for (
          let i = 0;
          i < fetchedCourses.length && i < chunkSize * 3;
          i += chunkSize
        ) {
          courseChunks.push(fetchedCourses.slice(i, i + chunkSize));
        }
        setCourseChunks(courseChunks);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    const fetchInternships = async () => {
      try {
        const data = await FetchEmployerInternships(employer_id, access_token);
        const chunkSize = 5;
        const internshipChunks = [];
        for (
          let i = 0;
          i < data.internships.length && i < chunkSize * 3;
          i += chunkSize
        ) {
          internshipChunks.push(data.internships.slice(i, i + chunkSize));
        }
        setInternshipChunks(internshipChunks);
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
      <NavbarEmployer />
      <div style={{ padding: "20px" }}>
        {/* Course Slider */}
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Featured Courses for Endorsement
        </Heading>
        <Slider {...sliderSettings}>
          {courseChunks.map((chunk, index) => (
            <div key={index} className="course-slide">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {chunk.map((course, courseIndex) => (
                  <div key={courseIndex}>
                    <Card
                      title={course.title}
                      description={course.objective}
                      link={course.url}
                    />
                    <IconButton
                      icon={<FaHeart />}
                      colorScheme="pink"
                      aria-label="Endorse Course"
                      onClick={handleEndorse}
                      size="sm"
                      className="endorse-button"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>

        {/* Internship Slider */}
        <Heading as="h2" size="lg" mt={8} mb={4} textAlign="center">
          My Internships
        </Heading>
        <Slider {...sliderSettings}>
          {internshipChunks.map((chunk, index) => (
            <div key={index} className="internship-slide">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                {chunk.map((internship, internshipIndex) => (
                  <div key={internshipIndex}>
                    <Card
                      title={internship.title}
                      description={`Description: ${
                        internship.description
                      } | Requirements: ${
                        internship.requirements
                      } | Location: ${internship.location} | Duration: ${
                        internship.duration
                      } | Salary: ${internship.salary || "Not specified"}`}
                      link=""
                    />
                    <Button
                      onClick={() => handleEditClick(internship._id)}
                      colorScheme="blue"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </ChakraProvider>
  );
};

export default EmployerHome;

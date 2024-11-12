import React, { useEffect, useState } from "react";
import { ChakraProvider, Heading, Button } from "@chakra-ui/react";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import SlideShow from "../../components/SlideShow/SlideShow";
import Slider from "react-slick";
import Card from "../../components/Card/Card";
import FetchPersonalisedCourses from "../../services/FetchPersonalisedCourses";
import FetchAllJobs from "../../services/FetchAllJobs";
import { CourseData, InternshipData } from "../../store/auth/interface";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "../../constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const JobSeekerHome: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const slides = ["../../assets/images1.jpeg", "../../assets/image3.jpeg"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");
        const fetchedCourses = await FetchPersonalisedCourses(
          userId,
          accessToken
        );
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const getCourseDescription = (course: CourseData) => `
    Objective: ${course.objective}
    Cost: $${course.totalCostOfTrainingPerTrainee}
    Duration: ${course.lengthOfCourseDurationHour} hours
    Provider: ${course.trainingProvider.name}
    Delivery Methods: ${course.methodOfDeliveries
      .map((m) => m.description)
      .join(", ")}
    Category: ${course.category.description}
    Areas of Training: ${course.areaOfTrainings
      .map((a) => a.description)
      .join(", ")}
    Entry Requirements: ${course.entryRequirement}
  `;

  return (
    <ChakraProvider>
      <NavbarJobSeeker />

      {/* Personalized Courses Slider */}
      <Heading as="h2" size="lg" mt={8} mb={4} textAlign="center">
        Personalized Courses
      </Heading>
      <Slider {...sliderSettings}>
        {courses.map((course, index) => (
          <div key={index} className="slider-item">
            <Card
              title={course.title}
              description={getCourseDescription(course)}
              link={course.url}
            />
          </div>
        ))}
      </Slider>

      {/* Jobs Slider */}
      <Heading as="h2" size="lg" mt={8} mb={4} textAlign="center">
        Available Internships
      </Heading>
      <Slider {...sliderSettings}>
        {internships.map((internship, index) => (
          <div key={index} className="slider-item">
            <Card
              title={internship.title}
              description={`${internship.description} \n Duration: ${
                internship.duration
              } \n Location: ${internship.location} \n Requirements: ${
                Array.isArray(internship.requirements)
                  ? internship.requirements.join(", ")
                  : internship.requirements
              } \n Salary: ${internship.salary}`}
              link={`${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`}
            />
          </div>
        ))}
      </Slider>
    </ChakraProvider>
  );
};

export default JobSeekerHome;

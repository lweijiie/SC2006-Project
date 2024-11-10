import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import FetchAllCourses from "../../services/FetchAllCourses";
import { ChakraProvider, IconButton, useToast } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import "../job-seeker/JobSeekerCourses.css";
import NavbarEmployer from "../../components/Navbar/NavbarEmployer";

const EmployerEndorseCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const fetchedCourses = await FetchAllCourses(accessToken);
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
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

  const getCourseDescription = (course: any): string => {
    const truncatedObjective = truncateText(course.objective, 4);
    return `
      Objective: ${truncatedObjective}
      Cost: $${course.totalCostOfTrainingPerTrainee}
      Duration: ${course.lengthOfCourseDurationHour} hours
      Provider: ${course.trainingProvider.name}
      Delivery Methods: ${course.methodOfDeliveries
        .map((method: any) => method.description)
        .join(", ")}
      Category: ${course.category.description}
      Areas of Training: ${course.areaOfTrainings
        .map((area: any) => area.description)
        .join(", ")}
      Entry Requirements: ${course.entryRequirement}
    `;
  };

  const handleEndorse = () => {
    toast({
      title: "Endorse Course Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider>
      <NavbarEmployer />
      <div className="card-list">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <IconButton
              icon={<FaHeart />}
              colorScheme="pink"
              aria-label="Endorse Course"
              onClick={handleEndorse}
              size="sm"
              className="endorse-button"
            />
            <Card
              title={course.title}
              description={getCourseDescription(course)}
              link={course.url}
            />
          </div>
        ))}
      </div>
    </ChakraProvider>
  );
};

export default EmployerEndorseCourses;

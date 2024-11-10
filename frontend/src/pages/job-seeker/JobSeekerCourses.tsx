import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import FetchAllCourses from "../../services/FetchAllCourses";
import { NAV_LINKS } from "../../constants";
import { ChakraProvider } from '@chakra-ui/react'

const JobSeekerCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);

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

  return (
    <ChakraProvider>
      <NavbarJobSeeker />
      <Link to={NAV_LINKS.job_seeker_personalised_courses}>
        <button className="navigate-btn">Go to Personalized Courses</button>
      </Link>
      <div className="card-list">
        {courses.map((course, index) => (
          <Card
            key={index}
            title={course.title}
            description={getCourseDescription(course)}
            link={course.url}
          />
        ))}
      </div>
    </ChakraProvider>
  );
};

export default JobSeekerCourses;

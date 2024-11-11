import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import FetchAllCourses from "../../services/FetchAllCourses";
import { NAV_LINKS } from "../../constants";
import { ChakraProvider } from '@chakra-ui/react';

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
            details={{
              description: truncateText(course.objective, 4), // Truncated for card display
              cost: `$${course.totalCostOfTrainingPerTrainee}`,
              duration: `${course.lengthOfCourseDurationHour} hours`,
              provider: course.trainingProvider.name,
              category: course.category.description,
              requirements: course.entryRequirement,
              deliveryMethods: course.methodOfDeliveries
                .map((method: any) => method.description)
                .join(", "),
              areasOfTraining: course.areaOfTrainings
                .map((area: any) => area.description)
                .join(", "),
            }}
            link={course.url}
          />
        ))}
      </div>
    </ChakraProvider>
  );
};

export default JobSeekerCourses;

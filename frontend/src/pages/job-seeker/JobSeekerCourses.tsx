import React, { useEffect, useState } from "react";
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import FetchAllCourses from "../../services/FetchAllCourses";

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

  // Helper function to trim objective to 4 lines and add "..."
  const truncateText = (text: string, lines: number): string => {
    const lineHeight = 1.4; // Adjust if necessary based on your styling
    const maxCharsPerLine = 20; // Estimate based on font size and container width
    const maxChars = maxCharsPerLine * lines * lineHeight;
    return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
  };

  // Helper function to construct course description
  const getCourseDescription = (course: any): string => {
    // Truncate the objective to 4 lines
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
    <div className="courses-page">
      <NavbarJobSeeker />
      <div className="card-list">
        {courses.map((course, index) => (
          <Card
            key={index}
            title={course.title} // Using the course title
            description={getCourseDescription(course)} // Constructing the description
            link={course.url} // Using the website URL as the link
          />
        ))}
      </div>
    </div>
  );
};

export default JobSeekerCourses;

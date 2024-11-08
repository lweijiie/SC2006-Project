import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import FetchPersonalisedCourses from "../../services/FetchPersonalisedCourses";
import { CourseData } from "../../store/auth/interface"; // Import CourseData type
import { NAV_LINKS } from "../../constants";

const JobSeekerPersonalisedCourses: React.FC = () => {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error message

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
        setError(
          "Failed to fetch personalized courses. Please try again later."
        );
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

  const getCourseDescription = (course: CourseData): string => {
    const truncatedObjective = truncateText(course.objective, 4);
    return `
      Objective: ${truncatedObjective}
      Cost: $${course.totalCostOfTrainingPerTrainee}
      Duration: ${course.lengthOfCourseDurationHour} hours
      Provider: ${course.trainingProvider.name}
      Delivery Methods: ${course.methodOfDeliveries
        .map((method) => method.description)
        .join(", ")}
      Category: ${course.category.description}
      Areas of Training: ${course.areaOfTrainings
        .map((area) => area.description)
        .join(", ")}
      Entry Requirements: ${course.entryRequirement}
    `;
  };

  return (
    <div className="courses-page">
      <NavbarJobSeeker />
      <Link to={NAV_LINKS.job_seeker_find_course}>
        <button className="navigate-btn">Go to All Courses</button>
      </Link>
      {error && <div className="error-message">{error}</div>}{" "}
      {/* Error message display */}
      <div className="card-list">
        {courses.length === 0 ? (
          <p>No personalized courses available.</p> // Handling empty courses list
        ) : (
          courses.map((course, index) => (
            <Card
              key={index}
              title={course.title}
              description={getCourseDescription(course)}
              link={course.url}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobSeekerPersonalisedCourses;

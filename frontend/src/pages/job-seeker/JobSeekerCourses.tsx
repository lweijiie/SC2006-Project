import React, { useEffect, useState } from "react";
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import { NAV_LINKS } from "../../constants";
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

  // Helper function to construct course description
  const getCourseDescription = (course: any): string => {
    return `
      Objective: ${course.objective}
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

import React, { useEffect, useState } from "react";
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import { NAV_LINKS } from "../../constants";
import { InternshipData } from "../../store/auth/interface";
import FetchAllJobs from "../../services/FetchAllJobs";

const JobSeekerJobs: React.FC = () => {
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Adjust token retrieval as needed
        const fetchedInternships = await FetchAllJobs(token);
        setInternships(fetchedInternships);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="jobs-page">
      <NavbarJobSeeker />
      <div className="card-list">
        {error && <p>Error: {error}</p>}
        {internships.map((internship) => (
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
        ))}
      </div>
    </div>
  );
};

export default JobSeekerJobs;

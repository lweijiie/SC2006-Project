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
        <Card
          title={"TikTok Shop - Data Analyst Intern - 2025 Start"}
          description={`TikTok is the leading destination for short-form mobile video. At TikTok, our mission ...
\nRequirements: 
1. Bachelor degree or above, computer, statistics, mathematics and other related majors are preferred; 
2. SQL, EXCEL, Python;
\nSalary: 4000 SGD per month`}
          link={`https://www.linkedin.com/jobs/view/4000340994/?alternateChannel=search&refId=MxD%2BvWxlCfsWJIKPSn62cg%3D%3D&trackingId=IRWzOFU3P3fI%2FI2rQqSsEQ%3D%3D`}
        />
        {internships.map((internship) => (
          <Card
            title={internship.title}
            description={`${internship.description} \n\n Duration: ${
              internship.duration
            } \n Location: ${internship.location} \n\n Requirements: ${
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

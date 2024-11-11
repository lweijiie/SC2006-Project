import React, { useEffect, useState } from "react";
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import { NAV_LINKS } from "../../constants";
import { InternshipData } from "../../store/auth/interface";
import FetchAllJobs from "../../services/FetchAllJobs";
import { ChakraProvider } from '@chakra-ui/react'

const JobSeekerJobs: React.FC = () => {
  const [internships, setInternships] = useState<InternshipData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const fetchedInternships = await FetchAllJobs(token);
        setInternships(fetchedInternships);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <ChakraProvider>
      <NavbarJobSeeker />
      <div className="card-list">
        {error && <p>Error: {error}</p>}
        {internships.map((internship) => (
          <Card
            title={internship.title}
            details={{
              description: internship.description,
              duration: internship.duration,
              location: internship.location,
              requirements: Array.isArray(internship.requirements)
                ? internship.requirements.join(", ")
                : internship.requirements,
              salary: internship.salary,
            }}
            link={`${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`}
          />
        ))}
      </div>
    </ChakraProvider>
  );
};

export default JobSeekerJobs;

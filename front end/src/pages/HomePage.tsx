import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarJobSeeker from "../components/Navbar/NavbarJobSeeker";

interface JobSeekerProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
}

interface HomeProps {
  jobSeekerProfile?: JobSeekerProfile | null;
}

const HomePage: React.FC<HomeProps> = ({ jobSeekerProfile }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (jobSeekerProfile) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [jobSeekerProfile]);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div className="home-page">
      <NavbarJobSeeker
        firstName={jobSeekerProfile!.firstName}
        lastName={jobSeekerProfile!.lastName}
      />
      <div className="main-content">
        <h2>Job Seeker Dashboard</h2>
        <p>Explore opportunities in {jobSeekerProfile?.industry}</p>
        {/* Add more job seeker-specific content here */}
      </div>
    </div>
  );
};

export default HomePage;

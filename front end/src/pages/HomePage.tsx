import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarJobSeeker from "../components/NavbarJobSeeker";
import NavbarCompany from "../components/NavbarCompany";

// Job Seeker and Company Profile Interfaces
interface JobSeekerProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
}

interface CompanyProfile {
  _id: string;
  companyName: string;
  email: string;
}

interface HomeProps {
  jobSeekerProfile?: JobSeekerProfile | null;
  companyProfile?: CompanyProfile | null;
}

const HomePage: React.FC<HomeProps> = ({
  jobSeekerProfile,
  companyProfile,
}) => {
  const navigate = useNavigate();
  const [isJobSeeker, setIsJobSeeker] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (jobSeekerProfile) {
      setIsJobSeeker(true);
      setIsAuthenticated(true);
    } else if (companyProfile) {
      setIsJobSeeker(false);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [jobSeekerProfile, companyProfile]);

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div className="home-page">
      {isJobSeeker ? (
        <NavbarJobSeeker
          firstName={jobSeekerProfile!.firstName}
          lastName={jobSeekerProfile!.lastName}
        />
      ) : (
        <NavbarCompany companyName={companyProfile!.companyName} />
      )}
      <div className="main-content">
        {isJobSeeker ? (
          <div>
            <h2>Job Seeker Dashboard</h2>
            <p>Explore opportunities in {jobSeekerProfile?.industry}</p>
            {/* Add more job seeker-specific content here */}
          </div>
        ) : (
          <div>
            <h2>Company Dashboard</h2>
            <p>Manage your job postings and find the right candidates</p>
            {/* Add more company-specific content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

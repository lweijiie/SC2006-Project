import React, { useState } from "react";
import FetchJobSeekerProfile from "./services/FetchJobSeekerProfile";
import FetchEmployerProfile from "./services/FetchEmployerProfile";
import AppRoutes from "./routes/AppRoutes";

interface JobSeekerProfile {
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  industry: string | null;
}

interface EmployerProfile {
  email: string | null;
  companyName: string | null;
  industry: string | null;
  companyDescription: string | null;
}

const App: React.FC = () => {
  const [jobSeekerProfile, setJobUserProfile] = useState<JobSeekerProfile>({
    email: null,
    firstName: null,
    lastName: null,
    industry: null,
  });

  const [employerProfile, setEmployerProfile] = useState<EmployerProfile>({
    email: null,
    companyName: null,
    industry: null,
    companyDescription: null,
  });

  const handleJobSeekerLogin = async (userId: string) => {
    const jobSeekerProfile = await FetchJobSeekerProfile(userId);
    setJobUserProfile(jobSeekerProfile);
  };

  const handleEmployerLogin = async (userId: string) => {
    const employerProfile = await FetchEmployerProfile(userId);
    setEmployerProfile(employerProfile);
  };

  return (
    <div className="app">
      <AppRoutes
        handleJobSeekerLogin={handleJobSeekerLogin}
        handleEmployerLogin={handleEmployerLogin}
        jobSeekerProfile={jobSeekerProfile}
        employerProfile={employerProfile}
      />
    </div>
  );
};

export default App;

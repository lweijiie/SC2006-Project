import React, { useState } from "react";
import FetchJobSeekerProfile from "./services/FetchJobSeekerProfile";
import FetchEmployerProfile from "./services/FetchEmployerProfile";
import AppRoutes from "./routes/AppRoutes";
import { EmployerData, JobSeekerData } from "./store/auth/interface";

const App: React.FC = () => {
  const [jobSeekerProfile, setJobUserProfile] = useState<JobSeekerData>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    industry: "",
  });

  const [employerProfile, setEmployerProfile] = useState<EmployerData>({
    _id: "",
    email: "",
    companyName: "",
    industry: "",
    companyDescription: "",
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

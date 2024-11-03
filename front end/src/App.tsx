import React, { useState } from "react";
import FetchJobSeekerProfile from "./services/FetchJobSeekerProfile";
import FetchEmployerProfile from "./services/FetchEmployerProfile";
import AppRoutes from "./routes/AppRoutes";
import { EmployerData, JobSeekerData, Token } from "./store/auth/interface";

const App: React.FC = () => {
  const [jobSeekerProfile, setJobUserProfile] = useState<JobSeekerData>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    industry: "",
    education: "",
  });

  const [employerProfile, setEmployerProfile] = useState<EmployerData>({
    _id: "",
    email: "",
    companyName: "",
    industry: "",
    companyDescription: "",
  });

  const [accessToken, setAccessToken] = useState<Token>({ token: "" });

  const handleJobSeekerLogin = async (userId: string, access_token: string) => {
    setAccessToken({ token: access_token });
    localStorage.setItem("access_token", access_token);

    try {
      const jobSeekerProfile = await FetchJobSeekerProfile(
        userId,
        access_token
      );
      setJobUserProfile(jobSeekerProfile);
    } catch (error) {}
  };

  const handleEmployerLogin = async (userId: string, access_token: string) => {
    setAccessToken({ token: access_token });
    localStorage.setItem("access_token", access_token);

    try {
      const employerProfile = await FetchEmployerProfile(userId, access_token);
      setEmployerProfile(employerProfile);
    } catch (error) {}
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

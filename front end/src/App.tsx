import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NAV_LINKS } from "./constants";
import LandingPage from "./pages/landing/LandingPage";
import JobSeekerSignUp from "./pages/job-seeker/JobSeekerSignUp";
import JobSeekerLogin from "./pages/job-seeker/JobSeekerLogin";
import EmployerLogin from "./pages/employer/EmployerLogin";
import EmployerSignUp from "./pages/employer/EmployerSignUp";
import JobSeekerProfilePage from "./pages/job-seeker/JobSeekerProfilePage";
import FetchJobSeekerProfile from "./services/FetchJobSeekerProfile";
import FetchEmployerProfile from "./services/FetchEmployerProfile";
import JobSeekerHome from "./pages/job-seeker/JobSeekerHome";
import EmployerHome from "./pages/employer/EmployerHome";
import EmployerProfilePage from "./pages/employer/EmployerProfilePage";

interface JobSeekerProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  industry: string;
}

interface EmployerProfile {
  _id: string;
  email: string;
  companyName: string;
  industry: string;
  companyDescription: string;
}

const App: React.FC = () => {
  const [JobSeekerProfile, setJobUserProfile] =
    useState<JobSeekerProfile | null>(null);
  const [EmployerProfile, setEmployerProfile] =
    useState<EmployerProfile | null>(null);

  const handleJobSeekerLogin = async (userId: string) => {
    const jobSeekerProfile = await FetchJobSeekerProfile(userId);
    setJobUserProfile(jobSeekerProfile);
  };

  const handleEmployerLogin = async (userId: string) => {
    const employerProfile = await FetchEmployerProfile(userId);
    setEmployerProfile(employerProfile);
  };

  return (
    <Router>
      <Routes>
        <Route path={NAV_LINKS.home} element={<LandingPage />} />

        <Route
          path={NAV_LINKS.job_seeker_sign_up}
          element={<JobSeekerSignUp />}
        />
        <Route
          path={NAV_LINKS.job_seeker_login}
          element={<JobSeekerLogin onLogin={handleJobSeekerLogin} />}
        />
        <Route path={NAV_LINKS.job_seeker_home} element={<JobSeekerHome />} />
        <Route
          path={NAV_LINKS.job_seeker_profile}
          element={<JobSeekerProfilePage />}
        />

        <Route path={NAV_LINKS.employer_sign_up} element={<EmployerSignUp />} />
        <Route
          path={NAV_LINKS.employer_login}
          element={<EmployerLogin onLogin={handleEmployerLogin} />}
        />
        <Route path={NAV_LINKS.employer_home} element={<EmployerHome />} />
        <Route
          path={NAV_LINKS.employer_profile}
          element={<EmployerProfilePage />}
        />
      </Routes>
    </Router>
  );
};

export default App;

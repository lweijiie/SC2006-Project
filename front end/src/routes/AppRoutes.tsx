import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NAV_LINKS } from "../constants";
import LandingPage from "../pages/landing/LandingPage";
import JobSeekerSignUp from "../pages/job-seeker/JobSeekerSignUp";
import JobSeekerLogin from "../pages/job-seeker/JobSeekerLogin";
import JobSeekerHome from "../pages/job-seeker/JobSeekerHome";
import JobSeekerProfilePage from "../pages/job-seeker/JobSeekerProfilePage";
import EmployerSignUp from "../pages/employer/EmployerSignUp";
import EmployerLogin from "../pages/employer/EmployerLogin";
import EmployerHome from "../pages/employer/EmployerHome";
import EmployerProfilePage from "../pages/employer/EmployerProfilePage";
import React from "react";
import { EmployerData, JobSeekerData } from "../store/auth/interface";

interface Props {
  handleJobSeekerLogin: (userId: string, access_token: string) => void;
  handleEmployerLogin: (userId: string, access_token: string) => void;
  jobSeekerProfile: JobSeekerData;
  employerProfile: EmployerData;
}

const AppRoutes: React.FC<Props> = ({
  handleJobSeekerLogin,
  handleEmployerLogin,
  jobSeekerProfile,
  employerProfile,
}) => {
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
          element={<JobSeekerProfilePage profileData={jobSeekerProfile} />}
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

export default AppRoutes;

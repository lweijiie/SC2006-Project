import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Change to HashRouter
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
import EmployerPostInternship from "../pages/employer/EmployerPostInternship";
import React from "react";

interface Props {
  handleLogin: (userId: string, access_token: string) => void;
}

const AppRoutes: React.FC<Props> = ({ handleLogin }) => {
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
          element={<JobSeekerLogin onLogin={handleLogin} />}
        />
        <Route path={NAV_LINKS.job_seeker_home} element={<JobSeekerHome />} />
        <Route
          path={NAV_LINKS.job_seeker_profile}
          element={<JobSeekerProfilePage />}
        />

        <Route path={NAV_LINKS.employer_sign_up} element={<EmployerSignUp />} />
        <Route
          path={NAV_LINKS.employer_login}
          element={<EmployerLogin onLogin={handleLogin} />}
        />
        <Route path={NAV_LINKS.employer_home} element={<EmployerHome />} />
        <Route
          path={NAV_LINKS.employer_profile}
          element={<EmployerProfilePage />}
        />
        <Route
          path="/employer/post-internship"
          element={<EmployerPostInternship />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

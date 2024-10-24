import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_BASE_URL, NAV_LINKS } from "./constants";
import LandingPage from "./pages/LandingPage";
import JobSeekerSignUp from "./pages/job-seeker/JobSeekerSignUp";
import JobSeekerLogin from "./pages/job-seeker/JobSeekerLogin";
import EmployerLogin from "./pages/employer/EmployerLogin";
import EmployerSignUp from "./pages/employer/EmployerSignUp";

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

  const fetchJobSeekerProfile = async (
    userId: string
  ): Promise<JobSeekerProfile> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/jobseeker-profile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile.");
      }

      const data = await response.json();
      return {
        _id: data.user._id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        industry: data.user.industry,
      };
    } catch (err: any) {
      throw new Error(
        err.message || "An error occurred while fetching the profile."
      );
    }
  };

  const fetchEmployerProfile = async (
    userId: string
  ): Promise<EmployerProfile> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/employer-profile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user profile.");
      }

      const data = await response.json();
      return {
        _id: data.user._id,
        email: data.user.email,
        companyName: data.user.companyName,
        industry: data.user.industry,
        companyDescription: data.user.companyDescription,
      };
    } catch (err: any) {
      throw new Error(
        err.message || "An error occurred while fetching the profile."
      );
    }
  };

  const handleJobSeekerLogin = async (userId: string) => {
    const jobSeekerProfile = await fetchJobSeekerProfile(userId);
    setJobUserProfile(jobSeekerProfile);
  };

  const handleEmployerLogin = async (userId: string) => {
    const employerProfile = await fetchEmployerProfile(userId);
    setEmployerProfile(employerProfile);
  };

  return (
    <Router>
      <Routes>
        <Route path={NAV_LINKS.HOME} element={<LandingPage />} />
        <Route
          path={NAV_LINKS.JOB_SEEKER_SIGN_UP}
          element={<JobSeekerSignUp />}
        />
        <Route path={NAV_LINKS.EMPLOYER_SIGN_UP} element={<EmployerSignUp />} />
        <Route
          path={NAV_LINKS.JOB_SEEKER_LOGIN}
          element={<JobSeekerLogin onLogin={handleJobSeekerLogin} />}
        />
        <Route
          path={NAV_LINKS.EMPLOYER_LOGIN}
          element={<EmployerLogin onLogin={handleEmployerLogin} />}
        />
        {/* <Route
          path="/home"
          element={
            userProfile ? (
              userProfile.userType === "job-seeker" ? (
                <Navigate to="/job-seeker/home" /> // Redirect to job-seeker homepage
              ) : (
                <Navigate to="/company/home" /> // Redirect to company homepage
              )
            ) : (
              <Navigate to="/" /> // Redirect to landing page if not logged in
            )
          }
        /> */}
        {/* Define specific home pages for job seekers and companies */}
        {/* <Route path="/job-seeker/home" element={<JobSeekerHomePage />} />
        <Route path="/company/home" element={<CompanyHomePage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

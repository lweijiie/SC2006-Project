import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Change to HashRouter
import { NAV_LINKS } from "../constants";
import LandingPage from "../pages/landing/LandingPage";
import AboutUs from "../pages/landing/AboutUs";
import ContactUs from "../pages/landing/ContactUs";
import JobSeekerSignUp from "../pages/job-seeker/JobSeekerSignUp";
import JobSeekerLogin from "../pages/job-seeker/JobSeekerLogin";
import JobSeekerHome from "../pages/job-seeker/JobSeekerHome";
import JobSeekerProfilePage from "../pages/job-seeker/JobSeekerProfilePage";
import EmployerSignUp from "../pages/employer/EmployerSignUp";
import EmployerLogin from "../pages/employer/EmployerLogin";
import EmployerHome from "../pages/employer/EmployerHome";
import EmployerProfilePage from "../pages/employer/EmployerProfilePage";
import EmployerPostInternship from "../pages/employer/EmployerPostInternship";
import EmployerInternshipList from "../pages/employer/EmployerInternshipList";
import EmployerEditInternshipForm from "../components/Form/InternshipForm/EmployerEditInternshipForm";
import React from "react";
import JobSeekerCourses from "../pages/job-seeker/JobSeekerCourses";
import JobSeekerJobs from "../pages/job-seeker/JobSeekerJobs";
import JobSeekerSeeEmployers from "../pages/job-seeker/JobSeekerSeeEmployers";
import JobSeekerPersonalisedCourses from "../pages/job-seeker/JobSeekerPersonalisedCourses";

interface Props {
  handleLogin: (userId: string, access_token: string) => void;
}

const AppRoutes: React.FC<Props> = ({ handleLogin }) => {
  const employer_id = localStorage.getItem("user_id") || "";
  const access_token = localStorage.getItem("access_token") || "";

  return (
    <Router>
      <Routes>
        <Route path={NAV_LINKS.home} element={<LandingPage />} />
        <Route path ={NAV_LINKS.about_us} element = {<AboutUs />}/>
        <Route path = {NAV_LINKS.contact_us} element = {<ContactUs />}/>
        
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
        <Route
          path={NAV_LINKS.job_seeker_find_course}
          element={<JobSeekerCourses />}
        />
        <Route
          path={NAV_LINKS.job_seeker_personalised_courses}
          element={<JobSeekerPersonalisedCourses />}
        />
        <Route
          path={NAV_LINKS.job_seeker_job_search}
          element={<JobSeekerJobs />}
        />
        <Route
          path={`${NAV_LINKS.job_seeker_see_employers_base_link}:user_id`}
          element={<JobSeekerSeeEmployers />}
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
          path={NAV_LINKS.employer_list_internship}
          element={<EmployerPostInternship />}
        />

        <Route
          path="/employer/internships"
          element={<EmployerInternshipList />}
        />
        <Route 
          path="/employer/edit-internship/:internshipId" 
          element={<EmployerEditInternshipForm />} 
        />


      </Routes>
    </Router>
  );
};

export default AppRoutes;

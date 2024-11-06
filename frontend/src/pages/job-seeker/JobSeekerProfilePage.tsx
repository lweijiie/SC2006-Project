import React from "react";
import JobSeekerProfileUpdateForm from "../../components/Form/ProfileUpdateForm/JobSeekerProfileUpdateForm";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";

const JobSeekerProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <NavbarJobSeeker />
      <JobSeekerProfileUpdateForm />
    </div>
  );
};

export default JobSeekerProfilePage;

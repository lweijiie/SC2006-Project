import React, { useState } from "react";
import JobSeekerProfileUpdateForm from "../../components/Form/ProfileUpdateForm/JobSeekerProfileUpdateForm";

interface ProfileData {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  industry: string | null;
}

interface Props {
  profileData: ProfileData;
}

const JobSeekerProfilePage: React.FC<Props> = ({ profileData }) => {
  return (
    <div className="profile-page">
      <JobSeekerProfileUpdateForm profileData={profileData} />
    </div>
  );
};

export default JobSeekerProfilePage;

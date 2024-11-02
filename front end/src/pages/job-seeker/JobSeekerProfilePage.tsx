import React from "react";
import JobSeekerProfileUpdateForm from "../../components/Form/ProfileUpdateForm/JobSeekerProfileUpdateForm";
import { JobSeekerData } from "../../store/auth/interface";

interface Props {
  profileData: JobSeekerData;
}

const JobSeekerProfilePage: React.FC<Props> = ({ profileData }) => {
  return (
    <div className="profile-page">
      <JobSeekerProfileUpdateForm profileData={profileData} />
    </div>
  );
};

export default JobSeekerProfilePage;

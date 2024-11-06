import React from "react";
import JobSeekerSignUpForm from "../../components/Form/SignUpForm/JobSeekerSignUpForm";
import GoBackButton from "../../components/Button/GoBackButton";

const JobSeekerSignUp: React.FC = () => {
  return (
    <div>
      <GoBackButton />
      <JobSeekerSignUpForm />
    </div>
  );
};

export default JobSeekerSignUp;

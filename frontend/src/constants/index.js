export const API_BASE_URL = "http://127.0.0.1:5000";

export const NAV_LINKS = {
  base_link: "/career-path-now/#",
  home: "/",

  job_seeker_home: "/home/job-seeker",
  job_seeker_sign_up: "/sign-up/job-seeker",
  job_seeker_login: "/login/job-seeker",
  job_seeker_profile: "/profile/job-seeker",
  job_seeker_job_search: "/job/job-seeker",
  job_seeker_find_course: "/course/job-seeker",
  job_seeker_personalised_courses: "/personalised-courses/job-seeker",
  job_seeker_see_employers_base_link: "/view-employer/",

  employer_home: "/home/employer",
  employer_sign_up: "/sign-up/employer",
  employer_login: "/login/employer",
  employer_profile: "/profile/employer",
  employer_list_internship: "/employer/post-internship",
  employer_display_internships: "/employer/internships",
};

export const USER_TYPE = {
  job_seeker: "Job Seeker",
  employer: "Employer",
};

export const INDUSTRY_LIST = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
];

export const EDUCATION_LIST = [
  "Secondary",
  "Polytechnic",
  "Junior College",
  "Undergraduate",
  "Postgraduate",
];

export const ERROR_TEXT_FIELD_MESSAGE = {
  no_email_error: "Please enter your email",
  invalid_email_error: "Please enter a valid email address",
  no_password_error: "Please enter a password",
  under_length_password_error: "Password must be 8 characters or longer",
};

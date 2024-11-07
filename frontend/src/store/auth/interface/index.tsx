export interface JobSeekerData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  industry: string;
  education: string;
}

export interface EmployerData {
  _id: string;
  email: string;
  companyName: string;
  industry: string;
  companyDescription: string;
}

export interface InternshipData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  duration: string;
  salary?: string;
}

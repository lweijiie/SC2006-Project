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

export interface AuthBody {
  email: string;
  password: string;
}

export interface JobSeekerRegistrationBody extends AuthBody {
  firstName: string;
  lastName: string;
  industry: string;
}

export interface EmployerRegistrationBody extends AuthBody {}

export interface Token {
  token: string;
}

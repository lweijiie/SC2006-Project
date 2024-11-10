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

export interface MongoInternshipData {
  _id: string; // MongoDB-generated ID for existing internships, NOT BY EMPLOYER
  employer_id?: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  duration: string;
  salary?: string;
}

export interface InternshipData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  duration: string;
  salary?: string;
}

// CourseData interface should include all the necessary properties
export interface CourseData {
  id: string;
  title: string;
  objective: string;
  totalCostOfTrainingPerTrainee: number;
  lengthOfCourseDurationHour: number;
  url: string;
  trainingProvider: {
    name: string;
    aboutUs?: string;
    websiteUrl?: string;
  };
  methodOfDeliveries: {
    description: string;
  }[];
  category: {
    description: string;
  };
  areaOfTrainings: {
    description: string;
  }[];
  entryRequirement: string;
}

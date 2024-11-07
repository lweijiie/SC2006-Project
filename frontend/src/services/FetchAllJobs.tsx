// Import your constants and interfaces
import { API_BASE_URL } from "../constants";
import { InternshipData } from "../store/auth/interface";

// Define a type for the API response structure
interface FetchAllJobsResponse {
  internships: InternshipData[];
  page: number;
  per_page: number;
  total: number;
}

// Modify the function to fetch and handle the list of internships
const FetchAllJobs = async (
  access_token: string | null
): Promise<InternshipData[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/internships?page=1&per_page=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch internships.");
    }

    const data: FetchAllJobsResponse = await response.json();

    // Map the internships to ensure consistent structure in `requirements`
    const internships = data.internships.map((internship) => ({
      title: internship.title,
      description: internship.description,
      duration: internship.duration,
      location: internship.location,
      salary: internship.salary,
      requirements: Array.isArray(internship.requirements)
        ? internship.requirements.join(", ") // Convert array to comma-separated string
        : internship.requirements, // Use as-is if it's already a string
    }));

    return internships;
  } catch (err: any) {
    throw new Error(
      err.message || "An error occurred while fetching internships."
    );
  }
};

export default FetchAllJobs;

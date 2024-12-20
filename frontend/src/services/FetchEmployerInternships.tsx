import { API_BASE_URL } from "../constants";
import { MongoInternshipData } from "../store/auth/interface";

interface FetchEmployerInternshipsResponse {
  internships: MongoInternshipData[]; // Use MongoInternshipData here
}

const FetchEmployerInternships = async (
    employer_id: string,
    access_token: string
  ): Promise<FetchEmployerInternshipsResponse> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/employer-internships/${employer_id}`,
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
  
      const data = await response.json();
      return data; // This should include an array of internships with _id fields
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while fetching internships."
      );
    }
  };
  
export default FetchEmployerInternships;

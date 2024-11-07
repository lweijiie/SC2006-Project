import { API_BASE_URL } from "../constants";
import { MongoInternshipData } from "../store/auth/interface";

const FetchSingleInternship = async (internshipId: string, access_token: string): Promise<MongoInternshipData> => {
  const response = await fetch(`${API_BASE_URL}/internship/${internshipId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch internship data.");
  }

  const data = await response.json();
  return data.internship; // Assumes the backend returns { internship: MongoInternshipData }
};

export default FetchSingleInternship;

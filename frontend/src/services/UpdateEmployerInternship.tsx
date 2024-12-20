import { API_BASE_URL } from "../constants";
import { MongoInternshipData } from "../store/auth/interface";

const UpdateEmployerInternship = async (
  internshipId: string,
  accessToken: string,
  internshipData: MongoInternshipData
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/employer/edit-internship/${internshipId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(internshipData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Failed to update internship.";
      console.error("Error updating internship:", errorMessage, errorData);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error in UpdateEmployerInternship:", error);
    throw error;
  }
};

export default UpdateEmployerInternship;

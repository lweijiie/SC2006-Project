import { API_BASE_URL } from "../constants";
import { MongoInternshipData } from "../store/auth/interface";

const UpdateEmployerInternship = async (
  internshipId: string,
  accessToken: string,
  internshipData: MongoInternshipData
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/employer/edit-internship/${internshipId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(internshipData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update internship.");
  }
};

export default UpdateEmployerInternship;

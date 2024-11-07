import { API_BASE_URL } from "../constants";
import { InternshipData } from "../store/auth/interface";

const UpdateEmployerInternship = async (
    internshipId: string,
    updatedData: InternshipData,
    access_token: string
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/employer/edit-internship/${internshipId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update internship.");
    }
  
    return await response.json();
  };
  
  export default UpdateEmployerInternship;
  
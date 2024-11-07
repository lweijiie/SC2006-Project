import { API_BASE_URL } from "../constants";

const DeleteEmployerInternship = async (
    internshipId: string,
    access_token: string
  ): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/employer/delete-internship/${internshipId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete internship.");
    }
  
    return await response.json();
  };
  
  export default DeleteEmployerInternship;
  
import { API_BASE_URL } from "../constants";
// also import /EmployerPostInternshipForm.tsx later
import { InternshipData } from "../store/auth/interface";

const PostEmployerInternship = async (
  access_token: string | null,
  internshipData: InternshipData
): Promise<{ message: string }> => {
  if (!access_token) {
    throw new Error("Please log in again to post an internship.");
  }

  const response = await fetch(`${API_BASE_URL}/employer/post-internship`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(internshipData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to post internship.");
  }

  return await response.json();
};

export default PostEmployerInternship;

import { API_BASE_URL } from "../constants";

interface EmployerProfile {
  email: string;
  companyName: string;
  industry: string;
  companyDescription: string;
}

const FetchEmployerProfile = async (
  userId: string
): Promise<EmployerProfile> => {
  try {
    const response = await fetch(`${API_BASE_URL}/employer-profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user profile.");
    }

    const data = await response.json();
    return {
      email: data.user.email,
      companyName: data.user.companyName,
      industry: data.user.industry,
      companyDescription: data.user.companyDescription,
    };
  } catch (err: any) {
    throw new Error(
      err.message || "An error occurred while fetching the profile."
    );
  }
};

export default FetchEmployerProfile;

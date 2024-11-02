import { API_BASE_URL } from "../constants";
import { EmployerData } from "../store/auth/interface";

const FetchEmployerProfile = async (userId: string): Promise<EmployerData> => {
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
      _id: data.user._id,
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

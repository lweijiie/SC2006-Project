import { API_BASE_URL } from "../constants";
import { EmployerData } from "../store/auth/interface";

const FetchEmployerProfile = async (
  userId: string | null,
  access_token: string | null
): Promise<EmployerData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/employer-profile/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch employer profile.");
    }

    const data = await response.json();

    return {
      _id: data.user._id,
      email: data.user.email,
      industry: data.user.industry,
      companyName: data.user.company_name,
      companyDescription: data.user.company_description,
    };
  } catch (err: any) {
    throw new Error(
      err.message || "An error occurred while fetching the profile."
    );
  }
};

export default FetchEmployerProfile;

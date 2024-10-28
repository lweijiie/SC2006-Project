import { API_BASE_URL } from "../constants";

interface JobSeekerProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  industry: string;
}

const FetchJobSeekerProfile = async (
  userId: string
): Promise<JobSeekerProfile> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/jobseeker-profile/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user profile.");
    }

    const data = await response.json();
    return {
      _id: data.user._id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      industry: data.user.industry,
    };
  } catch (err: any) {
    throw new Error(
      err.message || "An error occurred while fetching the profile."
    );
  }
};

export default FetchJobSeekerProfile;

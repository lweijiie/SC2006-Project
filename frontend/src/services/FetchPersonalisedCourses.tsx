// Import your constants and interfaces
import { API_BASE_URL } from "../constants";
import { CourseData } from "../store/auth/interface"; // Assuming CourseData is defined in the interface

interface Props {
  courses: CourseData[];
  message?: string; // Optional fields based on actual API structure
  page?: number;
  per_page?: number;
}

const FetchPersonalisedCourses = async (
  user_id: string | null,
  access_token: string | null
): Promise<CourseData[]> => {
  // Returning only courses for simplicity
  try {
    if (!user_id || !access_token) {
      throw new Error("User ID or Access Token is missing");
    }

    // Fetch request to the API endpoint for courses
    const response = await fetch(
      `${API_BASE_URL}/get-personalised-courses/${user_id}`, // Adjust URL to match your API endpoint
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`, // Authorization header
          "Content-Type": "application/json", // Content type
        },
      }
    );

    // Handle unsuccessful response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch courses.");
    }

    // Parse the response data
    const data: Props = await response.json();

    // Log the data to check the structure (only for debugging)
    console.log("Fetched Courses Data:", data);

    // Map the courses to ensure consistent structure
    const courses = data.courses.map((course) => ({
      id: course.id,
      title: course.title || "Untitled Course", // Fallback for title
      objective: course.objective || "", // Required property for CourseData
      totalCostOfTrainingPerTrainee: course.totalCostOfTrainingPerTrainee || 0, // Fallback for cost
      lengthOfCourseDurationHour: course.lengthOfCourseDurationHour || 0, // Fallback for duration
      url: course.url || "",
      trainingProvider: {
        name: course.trainingProvider?.name || "Unknown Provider", // Safe access with fallback
      },
      methodOfDeliveries:
        course.methodOfDeliveries?.map((method) => ({
          description: method.description || "No method description", // Add description as fallback
        })) || [], // Provide an empty array if undefined
      category: {
        description: course.category?.description || "Uncategorized",
      }, // Safe access with fallback
      areaOfTrainings:
        course.areaOfTrainings?.map((area) => ({
          description: area.description || "No area description", // Add description as fallback
        })) || [], // Provide an empty array if undefined
      entryRequirement: course.entryRequirement || "No requirements", // Entry requirements
    }));

    return courses;
  } catch (err: any) {
    // Return error if fetching or mapping courses fails
    console.error("Error fetching personalised courses:", err);
    throw new Error(err.message || "An error occurred while fetching courses.");
  }
};

export default FetchPersonalisedCourses;

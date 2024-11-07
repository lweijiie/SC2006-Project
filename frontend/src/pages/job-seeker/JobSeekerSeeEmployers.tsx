import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the dynamic route params
import FetchEmployerProfile from "../../services/FetchEmployerProfile"; // Service to fetch the profile
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";

const JobSeekerSeeEmployers: React.FC = () => {
  const { user_id } = useParams(); // Get the user_id from the URL params
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user_id || !access_token) {
        console.error("User ID or access token is missing.");
        setLoading(false);
        return;
      }

      try {
        const fetchedProfile = await FetchEmployerProfile(
          user_id,
          access_token
        ); // Fetch profile based on user_id
        setProfile(fetchedProfile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employer profile:", error);
        setLoading(false);
      }
    };

    fetchProfile(); // Call the fetchProfile function when the component is mounted
  }, [user_id, access_token]); // Re-run the effect if user_id or access_token changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while profile is being fetched
  }

  return (
    <div>
      <NavbarJobSeeker />
      <div className="container">
        <h2 className="form-title">Employer Profile</h2>
        {profile ? (
          <div>
            <div className="user-box">
              <label className="field-label">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={profile.companyName ?? ""}
                disabled={true}
              />
            </div>
            <div className="user-box">
              <label className="field-label">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email ?? ""}
                disabled={true}
              />
            </div>
            <div className="user-box">
              <label className="field-label">Industry</label>
              <input
                name="industry"
                value={profile.industry ?? ""}
                disabled={true}
              />
            </div>
            <div className="user-box">
              <label className="field-label">Company Description</label>
              <input
                type="text"
                name="companyDescription"
                value={profile.companyDescription ?? ""}
                disabled={true}
              />
            </div>
          </div>
        ) : (
          <div>No profile data found.</div>
        )}
      </div>
    </div>
  );
};

export default JobSeekerSeeEmployers;

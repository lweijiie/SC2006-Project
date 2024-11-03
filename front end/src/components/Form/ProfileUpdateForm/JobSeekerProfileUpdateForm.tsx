import React, { useState, useEffect } from "react";
import { JobSeekerData } from "../../../store/auth/interface";
import FetchJobSeekerProfile from "../../../services/FetchJobSeekerProfile";
import "./ProfileUpdateForm.css";
import { API_BASE_URL } from "../../../constants";

const JobSeekerProfileUpdateForm: React.FC = () => {
  const access_token = localStorage.getItem("access_token") || "";
  const user_id = localStorage.getItem("user_id") || "";

  const [profile, setProfile] = useState<JobSeekerData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // For success or error messages

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await FetchJobSeekerProfile(user_id, access_token);
        setProfile(data);
      } catch (error) {
        setMessage("Failed to load profile data");
      }
    };

    fetchProfileData();
  }, [user_id, access_token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (profile) {
      setProfile(
        (prevProfile) => ({ ...prevProfile, [name]: value } as JobSeekerData)
      );
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/update-jobseeker-profile/${user_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: profile.email,
            first_name: profile.firstName,
            last_name: profile.lastName,
            industry: profile.industry,
            education: profile.education,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (error) {
      setMessage("An error occurred while updating the profile");
    }
  };

  return (
    <div className="profile-box">
      {message && <div className="message">{message}</div>}
      {profile ? (
        <form onSubmit={handleSubmit}>
          <div className="profile-field">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Industry</label>
            <input
              type="text"
              name="industry"
              value={profile.industry ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="profile-field">
            <label>Education</label>
            <input
              type="text"
              name="education"
              value={profile.education ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="button-group">
            {isEditing ? (
              <button type="submit">Save</button>
            ) : (
              <button type="button" onClick={toggleEdit}>
                Edit Profile
              </button>
            )}
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default JobSeekerProfileUpdateForm;

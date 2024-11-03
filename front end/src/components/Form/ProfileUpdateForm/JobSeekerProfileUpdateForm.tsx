import React, { useState, useEffect } from "react";
import { JobSeekerData } from "../../../store/auth/interface";
import "./ProfileUpdateForm.css";

interface Props {
  profileData: JobSeekerData;
}

const JobSeekerProfileUpdateForm: React.FC<Props> = ({ profileData }) => {
  const [profile, setProfile] = useState<JobSeekerData>({
    _id: profileData._id,
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    industry: profileData.industry,
    education: profileData.education,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // For success or error messages

  useEffect(() => {
    setProfile({
      _id: profileData._id,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      industry: profileData.industry,
      education: profileData.education,
    });
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/update-jobseeker-profile/${profileData._id}`,
        {
          method: "POST",
          headers: {
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
    </div>
  );
};

export default JobSeekerProfileUpdateForm;

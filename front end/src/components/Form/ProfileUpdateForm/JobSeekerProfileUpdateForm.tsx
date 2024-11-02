import React, { useState, useEffect } from "react";

interface ProfileData {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  industry: string | null;
}

interface Props {
  profileData: ProfileData;
}

const JobSeekerProfileUpdateForm: React.FC<Props> = ({ profileData }) => {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: profileData.firstName ?? "",
    lastName: profileData.lastName ?? "",
    email: profileData.email ?? "",
    industry: profileData.industry ?? "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProfile({
      firstName: profileData.firstName ?? "",
      lastName: profileData.lastName ?? "",
      email: profileData.email ?? "",
      industry: profileData.industry ?? "",
    });
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    setIsEditing(false);
  };

  return (
    <div className="profile-box">
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

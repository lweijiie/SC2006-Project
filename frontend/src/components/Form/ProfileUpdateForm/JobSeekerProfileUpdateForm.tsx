import React, { useState, useEffect } from "react";
import { JobSeekerData } from "../../../store/auth/interface";
import FetchJobSeekerProfile from "../../../services/FetchJobSeekerProfile";
import "./ProfileUpdateForm.css";
import {
  API_BASE_URL,
  EDUCATION_LIST,
  INDUSTRY_LIST,
} from "../../../constants";

const JobSeekerProfileUpdateForm: React.FC = () => {
  const access_token = localStorage.getItem("access_token") || "";
  const user_id = localStorage.getItem("user_id") || "";

  const [profile, setProfile] = useState<JobSeekerData>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    industry: "",
    education: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [educationError, setEducationError] = useState("");

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setIndustryError("");
    setEducationError("");
    let hasError = false;

    if (profile.firstName === "") {
      setFirstNameError("Please enter your first name");
      hasError = true;
    } else if (!/^[a-zA-Z ]*$/.test(profile.firstName)) {
      setFirstNameError("Please enter a valid first name");
      hasError = true;
    }

    if (profile.lastName === "") {
      setLastNameError("Please enter your last name");
      hasError = true;
    } else if (!/^[a-zA-Z ]*$/.test(profile.lastName)) {
      setLastNameError("Please enter a valid last name");
      hasError = true;
    }

    if (profile.email === "") {
      setEmailError("Please enter your email");
      hasError = true;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profile.email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (profile.industry === "") {
      setIndustryError("Please select an industry");
      hasError = true;
    }

    if (profile.education === "") {
      setEducationError("Please select an education");
      hasError = true;
    }

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
            <label className="field-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={profile.firstName ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            {firstNameError && (
              <label className="errorLabel">{firstNameError}</label>
            )}
          </div>
          <div className="profile-field">
            <label className="field-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={profile.lastName ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            {lastNameError && (
              <label className="errorLabel">{lastNameError}</label>
            )}
          </div>
          <div className="profile-field">
            <label className="field-label">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            {emailError && <label className="errorLabel">{emailError}</label>}
          </div>
          <div className="profile-field">
            <label className="field-label">Industry</label>
            <select
              name="industry"
              value={profile.industry ?? ""}
              onChange={handleInputChange}
              className="profile-field"
            >
              <option value="">Select Industry</option>
              {INDUSTRY_LIST.map((industry, index) => (
                <option key={index} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {industryError && (
              <label className="errorLabel">{industryError}</label>
            )}
          </div>
          <div className="profile-field">
            <label className="field-label">Education</label>
            <select
              name="education"
              value={profile.education ?? ""}
              onChange={handleInputChange}
              className="profile-field"
            >
              <option value="">Select Education</option>
              {EDUCATION_LIST.map((education, index) => (
                <option key={index} value={education}>
                  {education}
                </option>
              ))}
            </select>
            {educationError && (
              <label className="errorLabel">{educationError}</label>
            )}
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

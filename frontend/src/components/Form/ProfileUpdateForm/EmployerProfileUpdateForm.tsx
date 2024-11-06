import React, { useState, useEffect } from "react";
import { EmployerData } from "../../../store/auth/interface";
import FetchEmployerProfile from "../../../services/FetchEmployerProfile";
import { API_BASE_URL, INDUSTRY_LIST, NAV_LINKS } from "../../../constants";
import { useNavigate } from "react-router-dom";

const EmployerProfileUpdateForm: React.FC = () => {
  const access_token = localStorage.getItem("access_token") || "";
  const user_id = localStorage.getItem("user_id") || "";

  const [profile, setProfile] = useState<EmployerData>({
    _id: "",
    companyName: "",
    email: "",
    industry: "",
    companyDescription: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [companyNameError, setCompanyNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [companyDescriptionError, setCompanyDescriptionError] = useState("");

  const navigate = useNavigate();
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await FetchEmployerProfile(user_id, access_token);
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
        (prevProfile) => ({ ...prevProfile, [name]: value } as EmployerData)
      );
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setCompanyNameError("");
    setEmailError("");
    setIndustryError("");
    setCompanyDescriptionError("");
    let hasError = false;

    if (profile.companyName === "") {
      setCompanyNameError("Please enter your company name");
      hasError = true;
    } else if (!/^[a-zA-Z ]*$/.test(profile.companyName)) {
      setCompanyNameError("Please enter a valid company name");
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

    if (profile.companyDescription === "") {
      setCompanyDescriptionError("Please enter your company description");
      hasError = true;
    } else if (!/^[a-zA-Z ]*$/.test(profile.companyDescription)) {
      setCompanyDescriptionError("Please enter a valid company description");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/update-employer-profile/${user_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: profile.email,
            company_name: profile.companyName,
            industry: profile.industry,
            company_description: profile.companyDescription,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        await delay(1000);
        navigate(NAV_LINKS.employer_home);
      } else {
        setMessage(data.message || "Failed to update profile");
      }
    } catch (error) {
      setMessage("An error occurred while updating the profile");
    }
  };

  return (
    <div className="container">
      <h2 className="form-title">Your Profile</h2>
      {profile ? (
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <label className="field-label">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={profile.companyName ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            {companyNameError && (
              <label className="errorLabel">{companyNameError}</label>
            )}
          </div>
          <div className="user-box">
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
          <div className="user-box">
            <label className="field-label">Industry</label>
            <select
              name="industry"
              value={profile.industry ?? ""}
              onChange={handleInputChange}
              className="user-box"
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
          <div className="user-box">
            <label className="field-label">Company Description</label>
            <input
              type="text"
              name="companyDescription"
              value={profile.companyDescription ?? ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            {companyDescriptionError && (
              <label className="errorLabel">{companyDescriptionError}</label>
            )}
          </div>
          <div className="button-group">
            {isEditing ? (
              <button type="submit" className="input-button">
                Save
              </button>
            ) : (
              <button
                type="button"
                className="input-button"
                onClick={toggleEdit}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EmployerProfileUpdateForm;

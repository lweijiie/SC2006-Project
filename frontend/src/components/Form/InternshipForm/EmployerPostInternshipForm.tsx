import React, { useState } from "react";
import PostEmployerInternship from "../../../services/PostEmployerInternship";
import { InternshipData } from "../../../store/auth/interface";
import { useNavigate } from "react-router-dom";

interface EmployerPostInternshipFormProps {
  onPostSuccess: () => void; // Callback for when posting is successful
}

const EmployerPostInternshipForm: React.FC<EmployerPostInternshipFormProps> = ({ onPostSuccess }) => {
  const [internship, setInternship] = useState<InternshipData>({
    title: "",
    description: "",
    requirements: "",
    location: "",
    duration: "",
    salary: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [requirementsError, setRequirementsError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [durationError, setDurationError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInternship((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    setTitleError("");
    setDescriptionError("");
    setRequirementsError("");
    setLocationError("");
    setDurationError("");

    let hasError = false;

    if (internship.title.trim() === "") {
      setTitleError("Please enter the title");
      hasError = true;
    }

    if (internship.description.trim() === "") {
      setDescriptionError("Please enter the description");
      hasError = true;
    }

    if (internship.requirements.trim() === "") {
      setRequirementsError("Please enter the requirements");
      hasError = true;
    }

    if (internship.location.trim() === "") {
      setLocationError("Please enter the location");
      hasError = true;
    }

    if (internship.duration.trim() === "") {
      setDurationError("Please enter the duration");
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      await PostEmployerInternship(accessToken, internship);
      onPostSuccess(); // Call the success callback here
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to post internship.");
    }
  };

  return (
    <div className="internship-form-container">
      <h2 className="form-title">Post a New Internship</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <label className="field-label">Title</label>
          <input
            type="text"
            name="title"
            value={internship.title}
            onChange={handleInputChange}
            required
          />
          {titleError && <label className="errorLabel">{titleError}</label>}
        </div>
        
        <div className="user-box">
          <label className="field-label">Description</label>
          <textarea
            name="description"
            value={internship.description}
            onChange={handleInputChange}
            required
          />
          {descriptionError && <label className="errorLabel">{descriptionError}</label>}
        </div>
        
        <div className="user-box">
          <label className="field-label">Requirements</label>
          <textarea
            name="requirements"
            value={internship.requirements}
            onChange={handleInputChange}
            required
          />
          {requirementsError && <label className="errorLabel">{requirementsError}</label>}
        </div>
        
        <div className="user-box">
          <label className="field-label">Location</label>
          <input
            type="text"
            name="location"
            value={internship.location}
            onChange={handleInputChange}
            required
          />
          {locationError && <label className="errorLabel">{locationError}</label>}
        </div>
        
        <div className="user-box">
          <label className="field-label">Duration</label>
          <input
            type="text"
            name="duration"
            value={internship.duration}
            onChange={handleInputChange}
            required
          />
          {durationError && <label className="errorLabel">{durationError}</label>}
        </div>
        
        <div className="user-box">
          <label className="field-label">Salary (optional)</label>
          <input
            type="text"
            name="salary"
            value={internship.salary || ""}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="input-button">
          Post Internship
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EmployerPostInternshipForm;

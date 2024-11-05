// src/components/Form/EmployerPostInternshipForm.tsx
import React, { useState } from "react";
import PostEmployerInternship from "../../../services/PostEmployerInternship";
// import "../../../components/ProfileUpdateForm/ProfileUpdateForm.css"; 

interface Props {
  onPostSuccess: () => void; // Callback after a successful post
}

const EmployerPostInternshipForm: React.FC<Props> = ({ onPostSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    duration: "",
    salary: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const access_token = localStorage.getItem("access_token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await PostEmployerInternship(access_token, formData);
      setMessage("Internship posted successfully!");
      onPostSuccess();
    } catch (error: any) {
      setMessage(error.message || "An error occurred while posting the internship.");
    }
  };

  return (
    <div className="profile-box">
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="profile-field">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Requirements</label>
          <textarea name="requirements" value={formData.requirements} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Duration</label>
          <input type="text" name="duration" value={formData.duration} onChange={handleChange} />
        </div>
        <div className="profile-field">
          <label>Salary (optional)</label>
          <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
        </div>
        <div className="button-group">
          <button type="submit">Post Internship</button>
        </div>
      </form>
    </div>
  );
};

export default EmployerPostInternshipForm;

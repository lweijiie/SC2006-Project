import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MongoInternshipData } from "../../../store/auth/interface";
import FetchSingleInternship from "../../../services/FetchSingleInternship";
import UpdateEmployerInternship from "../../../services/UpdateEmployerInternship";

const EmployerEditInternshipForm: React.FC = () => {
  const { internshipId } = useParams<{ internshipId: string }>(); // Use the URL parameter
  const [internship, setInternship] = useState<MongoInternshipData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token") || "";

  useEffect(() => {
    const loadInternship = async () => {
      if (!internshipId) {
        setError("Invalid internship ID.");
        return;
      }

      try {
        setLoading(true);
        const internshipData = await FetchSingleInternship(
          internshipId,
          access_token
        );
        setInternship(internshipData);
        setError(null);
      } catch (err) {
        setError("Failed to load internship data.");
      } finally {
        setLoading(false);
      }
    };

    loadInternship();
  }, [internshipId, access_token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInternship((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (internship) {
      try {
        await UpdateEmployerInternship(
          internship._id,
          access_token,
          internship
        );
        alert("Internship updated successfully!");
        navigate("/employer/internships");
      } catch (error) {
        setError("Failed to update internship.");
      }
    }
  };

  if (loading) return <p>Loading internship data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="internship-form-container">
      <h2 className="form-title">Edit Internship</h2>
      {internship && (
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={internship.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-box">
            <label>Description</label>
            <textarea
              name="description"
              value={internship.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-box">
            <label>Requirements</label>
            <textarea
              name="requirements"
              value={internship.requirements}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-box">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={internship.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-box">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={internship.duration}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="user-box">
            <label>Salary</label>
            <input
              type="text"
              name="salary"
              value={internship.salary || ""}
              onChange={handleInputChange}
            />
          </div>
          <button className="input-button" type="submit">
            Update Internship
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployerEditInternshipForm;

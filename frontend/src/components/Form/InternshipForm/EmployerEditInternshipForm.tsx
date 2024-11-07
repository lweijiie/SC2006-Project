import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MongoInternshipData } from "../../../store/auth/interface"; // Use MongoInternshipData here
import FetchEmployerInternships from "../../../services/FetchEmployerInternships";
import UpdateEmployerInternship from "../../../services/UpdateEmployerInternship"; // Service to handle PUT request for updating internship

interface EmployerEditInternshipFormProps {
  access_token: string;
  employer_id: string;
}

const EmployerEditInternshipForm: React.FC<EmployerEditInternshipFormProps> = ({ access_token, employer_id }) => {
  const { internshipId } = useParams<{ internshipId: string }>(); // Internship ID from route params
  const [internship, setInternship] = useState<MongoInternshipData | null>(null); // Use MongoInternshipData type here
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Fetch internship data on component mount
  useEffect(() => {
    const loadInternship = async () => {
      try {
        setLoading(true);
        const data = await FetchEmployerInternships(employer_id, access_token);
        const internshipData = data.internships.find((item) => item._id === internshipId); // _id now matches the MongoInternshipData type
        if (internshipData) {
          setInternship(internshipData); // Set fetched data
        } else {
          setError("Internship not found.");
        }
      } catch (err) {
        setError("Failed to load internship data.");
      } finally {
        setLoading(false);
      }
    };
    loadInternship();
  }, [internshipId, employer_id, access_token]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInternship((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (internship) {
      try {
        await UpdateEmployerInternship(internship._id, access_token, internship); // Use _id here as expected
        alert("Internship updated successfully!");
        navigate("/employer/internships"); // Redirect to internship list
      } catch (error) {
        setError("Failed to update internship.");
      }
    }
  };

  if (loading) return <p>Loading internship data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Internship</h2>
      {internship && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={internship.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={internship.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Requirements</label>
            <textarea
              name="requirements"
              value={internship.requirements}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={internship.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={internship.duration}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Salary</label>
            <input
              type="text"
              name="salary"
              value={internship.salary || ""}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update Internship</button>
        </form>
      )}
    </div>
  );
};

export default EmployerEditInternshipForm;

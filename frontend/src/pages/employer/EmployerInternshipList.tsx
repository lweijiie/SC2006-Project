import React, { useEffect, useState } from "react";
import FetchEmployerInternships from "../../services/FetchEmployerInternships";
import { InternshipData } from "../../store/auth/interface";

const EmployerInternshipList: React.FC = () => {
    const [internships, setInternships] = useState<InternshipData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    // always retrieve user_id and access_token from local storage
    const employer_id = localStorage.getItem("user_id") || "";
    const access_token = localStorage.getItem("access_token") || "";
  
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const data = await FetchEmployerInternships(employer_id, access_token);
        setInternships(data.internships);
        setError(null);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch internships."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [employer_id, access_token]);

  if (loading) {
    return <p>Loading internships...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="internship-list">
      <h2>Posted Internships</h2>
      {internships.length === 0 ? (
        <p>No internships found.</p>
      ) : (
        <ul>
          {internships.map((internship) => (
            <li key={internship.id}>
              <h3>{internship.title}</h3>
              <p>{internship.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployerInternshipList;
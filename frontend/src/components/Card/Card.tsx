import React, { useState } from "react";
import "./Card.css";

interface CardProps {
  title: string;
  details: {
    description: string;
    duration?: string;
    location?: string;
    requirements?: string;
    salary?: string;
    cost?: string;
    provider?: string;
    category?: string;
  };
  link: string;
}

const Card: React.FC<CardProps> = ({ title, details, link }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="card">
      <div className="card-content">
        <a href={link} target="_blank" rel="noopener noreferrer" className="card-title-link">
          <h3 className="card-title">{title}</h3>
        </a>
        <div className="card-details">
          <p className="card-description">
            {showFullDescription ? details.description : details.description.slice(0, 100) + '...'}
          </p>
          {details.duration && (
            <p className="card-detail"><strong>Duration:</strong> {details.duration}</p>
          )}
          {details.location && (
            <p className="card-detail"><strong>Location:</strong> {details.location}</p>
          )}
          {details.requirements && (
            <p className="card-detail"><strong>Requirements:</strong> {details.requirements}</p>
          )}
          {details.salary && (
            <p className="card-detail"><strong>Salary:</strong> {details.salary}</p>
          )}
          {details.cost && (
            <p className="card-detail"><strong>Cost:</strong> {details.cost}</p>
          )}
          {details.provider && (
            <p className="card-detail"><strong>Provider:</strong> {details.provider}</p>
          )}
          {details.category && (
            <p className="card-detail"><strong>Category:</strong> {details.category}</p>
          )}
        </div>
        <button className="show-more-button" onClick={toggleDescription}>
          {showFullDescription ? 'See Less' : 'See More'}
        </button>
      </div>
    </div>
  );
};

export default Card;

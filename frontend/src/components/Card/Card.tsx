import React from "react";
import "./Card.css";

interface CardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, link }) => {
  return (
    <a
      href={link} // The link redirects to the website URL
      target="_blank" // Opens in a new tab
      rel="noopener noreferrer" // Prevents security risks with `target="_blank"`
      className="card-link"
    >
      <div className="card">
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <div className="card-description">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;

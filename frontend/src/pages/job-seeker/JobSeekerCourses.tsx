import React from "react";
import "./JobSeekerCourses.css";
import Card from "../../components/Card/Card";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import { NAV_LINKS } from "../../constants";

const JobSeekerCourses: React.FC = () => {
  const cardData = [
    {
      title: "Card 1",
      description: "Description for card 1",
      imageUrl: "https://via.placeholder.com/300",
      link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`,
    },
    {
      title: "Card 2",
      description: "Description for card 2",
      imageUrl: "https://via.placeholder.com/300",
      link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`,
    },
    {
      title: "Card 3",
      description: "Description for card 3",
      imageUrl: "https://via.placeholder.com/300",
      link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`,
    },
    {
      title: "Card 4",
      description: "Description for card 4",
      imageUrl: "https://via.placeholder.com/300",
      link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`,
    },
    {
      title: "Card 5",
      description: "Description for card 5",
      imageUrl: "https://via.placeholder.com/300",
      link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`,
    },
    {
      title: "Card 6",
      description: "Description for card 6",
      imageUrl: "https://via.placeholder.com/300",
      link: `${NAV_LINKS.base_link}${NAV_LINKS.job_seeker_home}`,
    },
  ];

  return (
    <div className="courses-page">
      <NavbarJobSeeker />
      <div className="card-list">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default JobSeekerCourses;

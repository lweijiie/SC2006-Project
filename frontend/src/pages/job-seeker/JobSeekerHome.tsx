import React from "react";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import SlideShow from "../../components/SlideShow/SlideShow";

const JobSeekerHome: React.FC = () => {
  const slides = ["../../assets/images1.jpeg", "../../assets/image3.jpeg"];

  return (
    <div className="job-seeker-home">
      <NavbarJobSeeker />
      <SlideShow slides={slides} interval={4000} />
    </div>
  );
};

export default JobSeekerHome;

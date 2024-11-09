import React from 'react';
import NavbarLanding from '../../components/Navbar/NavbarLanding'; 


function AboutUs() {
  return (
    <div className="landing-page">
      <NavbarLanding />
      <div className="content">
        <h1>About Us</h1>
        <p>Welcome to our website! Here is some information about our company.</p>
      </div>
    </div>
  );
}

export default AboutUs;

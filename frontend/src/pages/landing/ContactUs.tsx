import React from 'react';
import NavbarLanding from '../../components/Navbar/NavbarLanding'; 


function ContactUs() {
  return (
    <div className="landing-page">
      <NavbarLanding />
        <div className="content">
        <h1>Contact Us</h1>
        <p>Feel free to reach out to us through our email or phone number provided here.</p>
      </div>
    </div>
  );
}

export default ContactUs;

import React from "react";
import NavbarJobSeeker from "../../components/Navbar/NavbarJobSeeker";
import { ChakraProvider } from '@chakra-ui/react'
import SlideShow from "../../components/SlideShow/SlideShow";

const JobSeekerHome: React.FC = () => {
  const slides = ["../../assets/images1.jpeg", "../../assets/image3.jpeg"];

  return (
    <ChakraProvider>
      <NavbarJobSeeker />
      <SlideShow slides={slides} interval={4000} />
    </ChakraProvider>
  );
};

export default JobSeekerHome;

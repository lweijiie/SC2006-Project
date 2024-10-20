import { useState } from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [isSignedIn, setSignInState] = useState(false);
  return (
    <>
      <div>
        <Navbar isSignedIn={isSignedIn}></Navbar>
      </div>
    </>
  );
};

export default HomePage;

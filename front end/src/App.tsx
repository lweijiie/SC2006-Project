import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [isSignedIn, setSignInState] = useState(false);
  return (
    <>
      <div>
        <Navbar isSignedIn={isSignedIn}></Navbar>
      </div>
    </>
  );
};

export default App;

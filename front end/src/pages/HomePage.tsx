import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
}

interface HomeProps {
  userProfile: UserProfile | null;
}

const HomePage = ({ userProfile }: HomeProps) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if (userProfile) {
    setIsAuthenticated(true);
  }

  return (
    <div className="home-page">
      <Navbar isSignedIn={isAuthenticated} />
    </div>
  );
};

export default HomePage;

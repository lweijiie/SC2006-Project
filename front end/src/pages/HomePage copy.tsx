import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/NavbarJobSeeker";
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

  // Use useEffect to update the authentication state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [userProfile]);

  return (
    <div className="home-page">
      <Navbar isSignedIn={isAuthenticated} />
    </div>
  );
};

export default HomePage;

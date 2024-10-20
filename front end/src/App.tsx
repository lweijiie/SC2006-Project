import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useState } from "react";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
}

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogin = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage userProfile={userProfile} />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;

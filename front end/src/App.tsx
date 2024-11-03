import React, { useState } from "react";
import FetchEmployerProfile from "./services/FetchEmployerProfile";
import AppRoutes from "./routes/AppRoutes";
import { EmployerData } from "./store/auth/interface";

const App: React.FC = () => {
  const [employerProfile, setEmployerProfile] = useState<EmployerData>({
    _id: "",
    email: "",
    companyName: "",
    industry: "",
    companyDescription: "",
  });

  const handleJobSeekerLogin = async (userId: string, access_token: string) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user_id", userId);
  };

  const handleEmployerLogin = async (userId: string, access_token: string) => {
    localStorage.setItem("access_token", access_token);

    try {
      const employerProfile = await FetchEmployerProfile(userId, access_token);
      setEmployerProfile(employerProfile);
    } catch (error) {}
  };

  return (
    <div className="app">
      <AppRoutes
        handleJobSeekerLogin={handleJobSeekerLogin}
        handleEmployerLogin={handleEmployerLogin}
        employerProfile={employerProfile}
      />
    </div>
  );
};

export default App;

import React from "react";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  const handleLogin = async (userId: string, access_token: string) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user_id", userId);
  };

  return (
    <div className="app">
      <AppRoutes handleLogin={handleLogin} />
    </div>
  );
};

export default App;

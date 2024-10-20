import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  industry: string;
}

interface LoginPageProps {
  onLogin: (userProfile: UserProfile) => void; // Prop for handling user login
}

function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="login-page">
      <Navbar isSignedIn={false} />
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;

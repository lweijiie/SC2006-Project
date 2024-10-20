import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  return (
    <>
      <div>
        <Navbar isSignedIn={false} />
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;

import Navbar from "../components/Navbar";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <>
      <div>
        <Navbar isSignedIn={false} />
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUpPage;

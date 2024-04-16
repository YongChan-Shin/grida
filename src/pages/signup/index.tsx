import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SignupForm from "../../components/users/SignupForm";

const SignupPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignupPage;
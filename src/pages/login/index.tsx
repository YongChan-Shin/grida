import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoginForm from "../../components/users/LoginForm";

const LoginPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
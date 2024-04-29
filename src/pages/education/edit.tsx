import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EducationForm from "../../components/education/EducationForm";

const EducationEditPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__menu">
            <Link to="/education/">목록</Link>
          </div>
          <EducationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EducationEditPage;
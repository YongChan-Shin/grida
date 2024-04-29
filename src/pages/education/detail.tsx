import { Link } from "react-router-dom";
import Header from "../../components/Header";
import EducationDetail from "../../components/education/EducationDetail";
import Footer from "../../components/Footer";

const EducationDetailPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__menu">
            <Link to="/education/">목록</Link>
          </div>
          <EducationDetail />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EducationDetailPage;
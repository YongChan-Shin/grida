import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import EducationList from "../../components/education/EducationList";

const EducationHome = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__title">교육(Education)</div>
          <div className="category__menu">
            <Link to="/education/new">작성</Link>
          </div>
          <EducationList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EducationHome;
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CultureDetail from "../../components/culture/CultureDetail";

const CultureDetailPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__menu">
            <Link to="/culture/">목록</Link>
          </div>
          <CultureDetail />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CultureDetailPage;
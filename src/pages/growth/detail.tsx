import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GrowthDetail from "../../components/growth/GrowthDetail";

const GrowthDetailPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__menu">
            <Link to="/growth/">목록</Link>
          </div>
          <GrowthDetail />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GrowthDetailPage;
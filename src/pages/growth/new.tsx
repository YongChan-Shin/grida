import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GrowthForm from "../../components/growth/GrowthForm";

const GrowthNewPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__menu">
            <Link to="/education/">목록</Link>
          </div>
          <GrowthForm/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GrowthNewPage;
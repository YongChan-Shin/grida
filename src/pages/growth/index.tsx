import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import GrowthList from "../../components/growth/GrowthList";

const GrowthHome = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__title">성장(Growth)</div>
          <div className="category__menu">
            <Link to="/growth/new">작성</Link>
          </div>
          <GrowthList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GrowthHome;
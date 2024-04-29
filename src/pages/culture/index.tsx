import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import CultureList from "../../components/culture/CultureList";

const CultureHome = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="category__title">문화(Culture)</div>
          <div className="category__menu">
            <Link to="/culture/new">작성</Link>
          </div>
          <CultureList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CultureHome;
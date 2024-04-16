import { Link } from "react-router-dom";
import Header from "../../components/Header";
import KnowledgeDetail from "../../components/knowledges/KnowledgeDetail";
import Footer from "../../components/Footer";

const KnowledgeDetailPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="knowledge__menu">
            <Link to="/knowledges/">목록</Link>
          </div>
          <KnowledgeDetail />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default KnowledgeDetailPage;
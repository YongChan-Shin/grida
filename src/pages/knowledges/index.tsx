import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import KnowledgeList from "../../components/KnowledgeList";

const KnowledgeHome = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="knowledge__menu">
            <Link to="/knowledges/">목록</Link>
            <Link to="/knowledges/new">작성</Link>
          </div>
          <KnowledgeList />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default KnowledgeHome;
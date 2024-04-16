import { Link } from "react-router-dom";
import Header from "../../components/Header";
import KnowledgeForm from "../../components/knowledges/KnowledgeForm";
import Footer from "../../components/Footer";

const KnowledgeEditPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="contentWrap">
        <div className="innerWrap">
          <div className="knowledge__menu">
            <Link to="/knowledges/">목록</Link>
          </div>
          <KnowledgeForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default KnowledgeEditPage;
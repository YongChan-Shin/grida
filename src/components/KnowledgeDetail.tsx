import { Link } from "react-router-dom";

const KnowledgeDetail = () => {
  return (
    <div className="knowledge__detail">
      <div className="knowledge__box">
        <div className="knowledge__date">
          2024-04-12 12:19
        </div>
        <div className="knowledge__content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit fugit distinctio doloribus molestur adipisicing elit. Reprehenderit fugit distinctio doloribgit distinctio doloribgit distinctio doloribgit distinctio doloribus molestiae molestias eaque placeat debitis itaque iure reiciendis!ctio doloribus molestiae molestias eaque placeat debitis itaque iure reiciendis!
        </div>
        <div className="knowledge__source">
          출처
        </div>
        <div className="knowledge__utils-box">
          <div className="knowledge__edit">
            <Link to={`/knowledges/edit/1`}>수정</Link>
          </div>
          <div className="knowledge__delete">
            <Link to={`/`}>삭제</Link>
          </div>
        </div>
      </div>
   </div>
  );
}

export default KnowledgeDetail;
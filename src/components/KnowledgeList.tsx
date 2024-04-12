import { Link } from "react-router-dom";

const KnowledgeList = () => {
  return (
    <div className="knowledge__list">
      {
        [...Array(10)].map((item, index) => (
          <div key={index} className="knowledge__box">
            <Link to={`/knowledges/${index}`}>
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
                  수정
                </div>
                <div className="knowledge__delete">
                  삭제
                </div>
              </div>
            </Link>
          </div>
        ))
      }
    </div>  
  );
}

export default KnowledgeList;
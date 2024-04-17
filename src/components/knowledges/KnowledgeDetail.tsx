import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./KnowledgeList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader";
import { toast } from "react-toastify";

const KnowledgeDetail = () => {
  
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "knowledges_posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ ...docSnap.data() as PostProps, id: docSnap?.id });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "knowledges_posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/knowledges");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id])

  return (
    <div className="knowledge__detail">
      {post ? (
        <div className="knowledge__box">
          <div className="knowledge__date">
            {post?.createdAt}
          </div>
          <div className="knowledge__content knowledge__content-pre-wrap">
            {post?.content}
          </div>
          <div className="knowledge__source">
            {post?.source}
          </div>
          <div className="knowledge__utils-box">
            <div className="knowledge__edit">
              <Link to={`/knowledges/edit/${post?.id}`}>수정</Link>
            </div>
            <div className="knowledge__delete" role="presentation" onClick={handleDelete}>
              삭제
            </div>
          </div>
        </div>
      ) : <Loader />}
   </div>
  );
}

export default KnowledgeDetail;
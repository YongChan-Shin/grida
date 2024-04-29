import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./GrowthList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../Loader";
import { toast } from "react-toastify";
import Comments from "../Comments";

const GrowthDetail = () => {
  
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  
  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "growth_posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ ...docSnap.data() as PostProps, id: docSnap?.id });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "growth_posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/growth");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id])

  return (
    <div className="category__detail">
      {post ? (
        <>
          <div className="category__box">
            <div className="category__date">
              {post?.createdAt}
            </div>
            <div className="category__content category__content-pre-wrap">
              {post?.content}
            </div>
            <div className="category__source">
              {post?.source}
            </div>
            <div className="category__utils-box">
              <div className="category__edit">
                <Link to={`/growth/edit/${post?.id}`}>수정</Link>
              </div>
              <div className="category__delete" role="presentation" onClick={handleDelete}>
                삭제
              </div>
            </div>
          </div>
          <Comments post={post} category={"growth_posts"} getPost={getPost} />
        </>
      ) : <Loader />}
   </div>
  );
}

export default GrowthDetail;
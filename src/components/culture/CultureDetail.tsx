import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from "./CultureList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import Loader from "../Loader";
import { toast } from "react-toastify";
import Comments from "../Comments";
import { deleteObject, ref } from "firebase/storage";

const CultureDetail = () => {
  
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "culture_posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ ...docSnap.data() as PostProps, id: docSnap?.id });
    }
  };

  const handleDelete = async (imageUrl: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && post && post.id) {
      // 스토리지 이미지 삭제
      const imageRef = ref(storage, imageUrl);

      if (imageUrl) {
        deleteObject(imageRef).catch((error) => {
          console.log(error);
        })
      }      
      await deleteDoc(doc(db, "culture_posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/culture");
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
            <div className="category__culture__wrap">
              <div className="category__culture__date">
                {post?.displayDate}
              </div>
              <div className="category__culture__content">
                {post?.content}
              </div>
            </div>
            {post?.imageUrl && (
              <div className="image-attatchment">
                <img src={post.imageUrl} alt="attatchment" />
              </div>
            )}
            <div className="category__utils-box">
              <div className="category__edit">
                <Link to={`/culture/edit/${post?.id}`}>수정</Link>
              </div>
              <div className="category__delete" role="presentation" onClick={() => handleDelete(post.imageUrl as string)}>
                삭제
              </div>
            </div>
          </div>
          <Comments post={post} category={"culture_posts"} getPost={getPost} />
        </>
      ) : <Loader />}
   </div>
  );
}

export default CultureDetail;
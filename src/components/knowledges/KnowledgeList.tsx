import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { toast } from "react-toastify";

export interface PostProps {
  id?: string,
  content: string,
  email: string,
  source: string,
  createdAt: string,
  updatedAt: string,
  uid: string
}

const KnowledgeList = () => {

  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    setPosts([]);
    
    // 게시글 작성시간순 정렬 쿼리 적용
    const postsRef = collection(db, "knowledges_posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const datas = await getDocs(postsQuery);
    
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps])
    })
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "knowledges_posts", id));
      toast.success("게시글을 삭제했습니다.");
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="knowledge__list">
      {
        posts?.length > 0 ? posts.map((post) => (
          <div key={post?.id} className="knowledge__box">
            <Link to={`/knowledges/${post?.id}`}>
              <div className="knowledge__date">
                {post?.createdAt}
              </div>
              <div className="knowledge__content">
                {post?.content}
              </div>
              <div className="knowledge__source">
                {post?.source}
              </div>
            </Link>
              <div className="knowledge__utils-box">
                <div className="knowledge__edit">
                  <Link to={`/knowledges/edit/${post?.id}`} >수정</Link>
                </div>
              <div className="knowledge__delete" role="presentation" onClick={() => handleDelete(post.id as string)}>
                  삭제
                </div>
              </div>
          </div>
        )) : <div className="knowledge__no-post">게시글이 없습니다.</div>
      }
    </div>  
  );
}

export default KnowledgeList;
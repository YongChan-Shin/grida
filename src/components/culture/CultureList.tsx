import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../firebase";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

export interface PostProps {
  id?: string,
  date: string,
  imageUrl?: string;
  content: string,
  email: string,
  createdAt: string,
  updatedAt: string,
  uid: string,
  comments?: CommentsInterface[]
}

export interface CommentsInterface {
  content: string;
  uid: string;
  createdAt: string;
  email: string;
}

const CultureList = () => {

  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    setPosts([]);
    
    // 게시글 작성시간순 정렬 쿼리 적용
    const postsRef = collection(db, "culture_posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const datas = await getDocs(postsQuery);
    
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps])
    })
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      // 스토리지 이미지 삭제
      const imageRef = ref(storage, imageUrl);

      if (imageUrl) {
        deleteObject(imageRef).catch((error) => {
          console.log(error);
        })
      }

      await deleteDoc(doc(db, "culture_posts", id));
      toast.success("게시글을 삭제했습니다.");
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="category__list">
      {
        posts?.length > 0 ? posts.map((post) => (
          <div key={post?.id} className="category__box">
            <Link to={`/culture/${post?.id}`}>
              <div className="category__date">
                {post?.createdAt}
              </div>
              <div className="category__culture__date">
                {post?.date}
              </div>
              <div className="category__culture__content">
                {post?.content}
              </div>
              <div className="category__culture__attatchment">
                <img src={post.imageUrl} alt="attatchment" />
              </div>
            </Link>
              <div className="category__utils-box">
                <div className="category__edit">
                  <Link to={`/culture/edit/${post?.id}`} >수정</Link>
                </div>
              <div className="category__delete" role="presentation" onClick={() => handleDelete(post.id as string, post.imageUrl as string)}>
                  삭제
                </div>
              </div>
          </div>
        )) : <div className="category__no-post">게시글이 없습니다.</div>
      }
    </div>  
  );
}

export default CultureList;
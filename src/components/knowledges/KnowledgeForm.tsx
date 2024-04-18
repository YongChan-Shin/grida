import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./KnowledgeList";

const KnowledgeForm = () => {

  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "knowledges_posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ ...docSnap.data() as PostProps, id: docSnap?.id });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setContent(post?.content);
      setSource(post?.source);
    }
  }, [post])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { name, value }
    } = e;

    if (name === "content") {
      setContent(value)
    }

    if (name === "source") {
      setSource(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        // 만약 post 데이터가 있다면, firestore로 데이터 수정
        const docRef = doc(db, "knowledges_posts", post?.id);
        await updateDoc(docRef, {
          content: content,
          source: source,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),          
        });
        toast.success("게시글을 수정했습니다.");
        navigate(`/knowledges/${post?.id}`);
      } else {
        //  firestore로 데이터 생성
        await addDoc(collection(db, "knowledges_posts"), {
          content: content,
          source: source,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),
          email: user?.email,
          uid: user?.uid
        });
        toast.success("게시글을 작성했습니다.");
        navigate("/knowledges");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" onChange={onChange} value={content} required />
      </div>
      <div className="form__block">
        <label htmlFor="source">출처</label>
        <input type="text" name="source" id="source" onChange={onChange} value={source} required />
      </div>
      <div className="form__block">
        <input type="submit" value={post ? "수정" : "작성"} className="form__btn-submit" />
      </div>
    </form>
  );
}

export default KnowledgeForm;
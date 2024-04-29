import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./CultureList";
import { v4 as uuidv4 } from 'uuid';

const CultureForm = () => {

  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "culture_posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ ...docSnap.data() as PostProps, id: docSnap?.id });
    }
  };

  const handleFileUpload = (e: any) => {
    const { target: {
      files
    } } = e;

    const file = files?.[0]
    const fileReader = new FileReader();
    fileReader?.readAsDataURL(file);

    fileReader.onloadend = (e: any) => {
      const { result } = e.currentTarget;
      setImageFile(result);
    }
  };
  
  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post) {
      setContent(post?.content);
      setDate(post?.date);
      setImageFile(post?.imageUrl as string)
    }
  }, [post])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { name, value }
    } = e;

    if (name === "date") {
      setDate(value)
    }

    if (name === "content") {
      setContent(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    e.preventDefault();

    try {
      if (post && post.id) {
        // 기존 사진 지우고 새로운 사진 업로드
        if (post?.imageUrl) {
          const imageRef = ref(storage, post?.imageUrl);
          await deleteObject(imageRef).catch((error) => {
            console.log(error)
          });
        }

        // 새로운 사진 파일 있다면 업로드
        let imageUrl = "";
        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, "data_url");
          imageUrl = await getDownloadURL(data?.ref)
        }

        // 만약 post 데이터가 있다면, firestore로 데이터 수정
        const docRef = doc(db, "culture_posts", post?.id);
        await updateDoc(docRef, {
          date: date,
          content: content,
          imageUrl: imageUrl,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),          
        });
        toast.success("게시글을 수정했습니다.");
        navigate(`/culture/${post?.id}`);
      } else {
        //  firestore로 데이터 생성
        // 이미지 업로드
        let imageUrl = "";
        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, "data_url");
          imageUrl = await getDownloadURL(data?.ref)
        }

        // 업로드 된 이미지의 다운로드 url 업데이트
        await addDoc(collection(db, "culture_posts"), {
          date: date,
          content: content,
          imageUrl: imageUrl,
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),
          email: user?.email,
          uid: user?.uid
        });
        toast.success("게시글을 작성했습니다.");
        setImageFile(null);
        setIsSubmitting(true);
        navigate("/culture");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="date">일자</label>
        <input type="date" name="date" id="date" onChange={onChange} value={date} required />
      </div>      
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <input type="text" name="content" id="content" onChange={onChange} value={content} required />
      </div>
      <div className="form__block">
        <label htmlFor="file-input">이미지</label>
        <input type="file" name="file-input" id="file-input" accept="image/*" onChange={handleFileUpload} required />
        {imageFile && (
          <div className="post-form__attatchment">
            <img src={imageFile} className="attactchment" alt="attactchment" />
          </div>
        )}
      </div>
      <div className="form__block">
        <input type="submit" value={post ? "수정" : "작성"} className="form__btn-submit" disabled={isSubmitting} />
      </div>
    </form>
  );
}

export default CultureForm;
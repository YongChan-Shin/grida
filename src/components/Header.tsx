import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { toast } from "react-toastify";

const Header = () => {

  const { user } = useContext(AuthContext);
  console.log(user);
  
  const onSignout = async () => {

    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  }

  return (
    <header>
      <div className="innerWrap">header</div>
      <div>{user ? (<div onClick={onSignout}>로그아웃</div>) : ""}</div>
    </header>
  );
}

export default Header;
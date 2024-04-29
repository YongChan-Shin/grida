import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Header = () => {

  const { user } = useContext(AuthContext);
  
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
      <div className="innerWrap">
        <div className="header__box">
          <div className="logo"><Link to="/">Grida</Link></div>
          <nav>
            <ul>
              <li><Link to="/growth">성장</Link></li>
              <li><Link to="/education">교육</Link></li>
              <li><Link to="/culture">문화</Link></li>
              <li><Link to="/education">경제</Link></li>
            </ul>
          </nav>
          <div className="logout__box">
            {user?.email && (
              <>
                <div className="logout__info">{user?.email}님 반갑습니다 :-)</div>
                <div className="logout-btn">{user ? (<div onClick={onSignout}>로그아웃</div>) : ""}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
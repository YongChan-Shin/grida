import { getAuth, onAuthStateChanged } from 'firebase/auth'
import './App.scss'
import Router from './components/Router'
import { app, db } from './firebase'
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from './components/Loader';
import AuthContext from './context/AuthContext';

function App() {
  console.log(db)
  const auth = getAuth(app);

  const [init, setInit] = useState<boolean>(false);
  // auth를 체크하기 전(initialize 전)에는 loader를 띄워주는 용도

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  // auth의 currentUser가 있으면 authenticated로 변경

  console.log(isAuthenticated);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </>
  )
}

export default App

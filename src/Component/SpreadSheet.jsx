import React from 'react';
import Navbar from './Navbar'
import Message from './Message';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
const auth = getAuth();

const SpreadSheet = () => {
  const navigate=useNavigate();
  const [user, setUser] = React.useState(null);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      navigate('/login');
    }
  });
  if(user===null){
    navigate('/login');
  }
  return (
    <>
    <Navbar/>
    <iframe
    src="/sheet/ssctrltest1.html"  // aapki HTML file ka correct path
    title="SpreadSheet"
    width="100%"
    height="700vh"
    style={{border: 'none'}}
  ></iframe>
  <Message/>
    </>
  );
};

export default SpreadSheet;

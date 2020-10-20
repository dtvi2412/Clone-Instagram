import React, { useEffect, useState } from 'react';

import './App.css';
import SignIn from './SignIn/SignIn';
import {auth} from "./configFirebase";
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import Footer from './Footer/Footer';

function App() {
  // console.log(auth);
  let localUser =   JSON.parse(localStorage.getItem("user"));
 
  const [taikhoan,setTaikhoan] = useState(localUser);

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        let email = user.email;       
        setTaikhoan(true);
        localStorage.setItem("user",JSON.stringify(true));
 
      }else{
        localStorage.setItem("user",JSON.stringify(false));
        setTaikhoan(false);
      }
    })
  },[])
  const loadPage = () => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        let email = user.email;       
        setTaikhoan(true);
        localStorage.setItem("user",JSON.stringify(true));
 
      }else{
      
      }
    })
  }
  const handleLogout = () =>{
    setTaikhoan(false);
  }
  return (    
    <div className="App">
      {loadPage()}
      {taikhoan ?  <Home taikhoan={handleLogout}/> : <SignIn/> }
  
       {/* <SignUp/> */}
      
    </div>
  );
}

export default App;

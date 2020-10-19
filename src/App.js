import React, { useState } from 'react';

import './App.css';
import SignIn from './SignIn/SignIn';
import {auth} from "./configFirebase";
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import Footer from './Footer/Footer';

function App() {
  // console.log(auth);
  let localUser =JSON.parse(localStorage.getItem("user"));
 
  const [taikhoan,setTaikhoan] = useState(localUser);

  const loadPage = () => {
    auth.onAuthStateChanged((user)=>{
      if(user){
        let email = user.email;       
        setTaikhoan(true);
 
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

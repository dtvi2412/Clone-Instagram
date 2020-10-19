import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../configFirebase';
function Home({ taikhoan }) {
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut();
    // history.push('/');

    localStorage.setItem('user', JSON.parse(false));
    taikhoan();
  };
  return (
    <div>
      HOME PAGE
      <div onClick={handleLogout}>Log out</div>
    </div>
  );
}

export default Home;

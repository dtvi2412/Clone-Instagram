import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../configFirebase';
import Header from '../Header/Header';
import Main from '../Main/Main';
function Home({ taikhoan }) {
  const history = useHistory();
  // console.log(auth.currentUser.displayName);
  const handleLogout = () => {
    auth.signOut();

    localStorage.setItem('user', JSON.parse(false));
    taikhoan();
  };
  return (
    <div>
      {/*Begin Header */}
      <Header taikhoan={taikhoan} />
      {/* End header */}

      {/* Begin Main */}
      <Main />
      {/* End Main */}
    </div>
  );
}

export default Home;

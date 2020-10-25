import React, { useEffect, useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import './Header.scss';
import { auth } from '../configFirebase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SettingsIcon from '@material-ui/icons/Settings';
import * as firebase from 'firebase';
function Header({ taikhoan }) {
  //   console.log(auth.currentUser?.photoURL);
  useEffect(() => {
    let input = document.getElementById('input');
    let timkiem = document.getElementById('timkiem');
    let close = document.getElementById('close');
    input.addEventListener('focus', () => {
      timkiem.classList.remove('header__content__found__search');
      timkiem.classList.add('header__content__found__searchNew');
      close.style.visibility = 'visible';
    });

    input.addEventListener('focusout', () => {
      timkiem.classList.add('header__content__found__search');
      timkiem.classList.remove('header__content__found__searchNew');
      close.style.visibility = 'hidden';
    });

    //GET IF USER FIREBASE
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        setImg(user.photoURL);
      } else {
        console.log('err');
      }
    });
  }, []);
  const [img, setImg] = useState('');
  // let img = auth.currentUser?.photoURL;
  localStorage.setItem('imageUser', JSON.stringify(auth.currentUser?.photoURL));

  //Create Info
  const [info, setInfo] = useState(false);

  //LOGOUT
  const handleLogout = () => {
    auth.signOut();

    localStorage.setItem('user', JSON.parse(false));
    taikhoan();
  };
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__content__logo">
          <h1>Instagram</h1>
        </div>
        <div className="header__content__found">
          <div className="header__content__found__search" id="timkiem">
            <SearchIcon />
          </div>
          <input placeholder="Tìm kiếm" id="input" />
          <div id="close" className="close">
            <CloseIcon />
          </div>
        </div>
        <div className="header__content__icons">
          <div
            className="header__content__icons__icon"
            id="home"
            style={{ color: `${info ? 'gray' : '#111'}` }}
          >
            <HomeIcon />
          </div>
          <div className="header__content__icons__icon">
            <AllInboxIcon />
          </div>
          <div className="header__content__icons__icon">
            <ExploreIcon />
          </div>
          <div className="header__content__icons__icon">
            <FavoriteBorderIcon />
          </div>
          <div className="header__content__icons__icon">
            <div
              className="header__content__icons__icon__avarta"
              onClick={() => setInfo(!info)}
            >
              {/* GET IMAGE USER */}
              {img ? (
                <img src={img} />
              ) : (
                <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" />
              )}
            </div>
          </div>

          {/* SET INFO IF TRUE VISIBLE */}
          {info && (
            <div className="header__content__icons__info">
              <div className="header__content__icons__info__text">
                {/* <div className="icon"> */}
                <AccountCircleIcon />
                {/* </div> */}
                <h3>Trang cá nhân</h3>
              </div>
              <div className="header__content__icons__info__text">
                {/* <div className="icon"> */}
                <BookmarkBorderIcon />
                {/* </div> */}
                <h3>Đã lưu</h3>
              </div>
              <div className="header__content__icons__info__text">
                {/* <div className="icon"> */}
                <SettingsIcon />
                {/* </div> */}
                <h3>Cài đặt</h3>
              </div>
              <div
                className="header__content__icons__info__text dangxuat"
                onClick={handleLogout}
              >
                <h3>Đăng xuất</h3>
              </div>
            </div>
          )}
        </div>
        {/* Test */}

        {/* End test */}
      </div>
    </header>
  );
}

export default Header;

import React, { useEffect, useState } from 'react';

import { auth } from '../configFirebase';
import Footer from '../Footer/Footer';
import Err from '../PopupErr/Err';
import SignUp from '../SignUp/SignUp';
import './SignIn.scss';
function SignIn() {
  const img =
    'https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png';

  const [err, setErr] = useState('');
  const [image, setImage] = useState([
    {
      id: 0,
      src:
        'https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg',
    },
    {
      id: 1,
      src:
        'https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg',
    },
    {
      id: 2,
      src:
        'https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg',
    },
  ]);

  //NEXT IMAGE
  let index = 0;
  const next = () => {
    let img = document.querySelectorAll('.change');
    const width = 231;

    if (index < image.length - 1) {
      index++;
    } else {
      index = 0;
    }
    img.forEach((listImage) => {
      listImage.style.transform = `translateX(-${width * index}px)`;
    });
  };
  useEffect(() => {
    setInterval(() => {
      next();
    }, 3000);
  }, []);

  const [popupErr, setPopupErr] = useState(false);
  //Login
  const SignIn = (e) => {
    e.preventDefault();
    let ipName = document.getElementById('nameip');
    let passwordip = document.getElementById('passwordip');
    if (ipName.value === '' || passwordip.value === '') {
      setErr('You need to fill out all the information!');
      setPopupErr(true);
      setTimeout(() => {
        setPopupErr(false);
      }, 2000);

      // alert('Bạn cần nhập đầy đủ thông tin!');
    } else {
      const promise = auth.signInWithEmailAndPassword(
        ipName.value,
        passwordip.value
      );
      promise
        .then((rs) => {
          //   console.log(rs);
          localStorage.setItem('user', JSON.parse(true));
        })
        .catch((e) => {
          // alert(e.message);
          setPopupErr(true);
          setTimeout(() => {
            setPopupErr(false);
          }, 2000);
          setErr(e.message);
        });

      //   alert('Sign in', ipName);
    }
  };

  const changeName = () => {
    let ipName = document.getElementById('nameip');
    let namelb = document.getElementById('namelb');

    //Email
    if (ipName.value !== '') {
      namelb.classList.remove('label');
      namelb.classList.add('labelFocus');
    }
    if (ipName.value === '') {
      namelb.classList.add('label');
      namelb.classList.remove('labelFocus');
    }
  };

  const changePassword = () => {
    let passwordip = document.getElementById('passwordip');
    let passwordlb = document.getElementById('passwordlb');
    //Password
    console.log(passwordip.value);
    if (passwordip.value !== '') {
      passwordlb.classList.remove('label');
      passwordlb.classList.add('labelFocus');
    }
    if (passwordip.value === '') {
      passwordlb.classList.add('label');
      passwordlb.classList.remove('labelFocus');
    }
  };

  //SIGN UP
  const [signUp, setSignup] = useState(false);
  const openSignUp = () => {
    setSignup(true);
  };
  const handleCloseSignUp = () => {
    setSignup(false);
  };
  return (
    <React.Fragment>
      <div className="signIn">
        <div className="signIn__content">
          <div className="signIn__content__img">
            <img src={img} alt={`hinh ${img}`} />
            <div className="imageCon">
              {image.map((item) => {
                return <img src={item.src} className="change" />;
              })}
            </div>
          </div>
          <div className="dangnhapvadangky">
            {' '}
            <form onSubmit={(e) => SignIn(e)}>
              <h1>Instagram</h1>
              <div className="thongtin">
                <input
                  type="text"
                  name="name"
                  id="nameip"
                  onChange={() => changeName()}
                />
                <label id="namelb" className="label">
                  Số điện thoại, tên người dùng hoặc email
                </label>
              </div>
              <div className="thongtin">
                <input
                  type="password"
                  name="password"
                  id="passwordip"
                  onChange={() => changePassword()}
                />
                <label id="passwordlb" className="label">
                  Mật khẩu
                </label>
              </div>
              <input type="submit" className="dangnhap" value="Đăng Nhập" />
            </form>
            <div className="button" onClick={openSignUp}>
              <h1>
                Bạn không có tài khoản?<span>Đăng ký</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {signUp && <SignUp signUp={handleCloseSignUp} />}

      {popupErr && <Err err={err} />}
    </React.Fragment>
  );
}

export default SignIn;

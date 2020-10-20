import React, { useState } from 'react';
import { auth, facebook, google } from '../configFirebase';
import './SignUp.scss';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import Err from '../PopupErr/Err';
import * as firebase from 'firebase';
function SignUp({ signUp }) {
  const [nameIp, setNameIp] = useState('');
  const [passwordIp, setPasswordIp] = useState('');
  //Send Error message in popup
  const [err, setErr] = useState('');
  const [popupErr, setPopupErr] = useState(false);
  const SignUp = (e) => {
    e.preventDefault();

    const promise = auth.createUserWithEmailAndPassword(nameIp, passwordIp);

    promise
      .then((rs) => {
        localStorage.setItem('user', JSON.stringify(true));
      })
      .catch((e) => {
        setPopupErr(true);
        setErr(e.message);

        setTimeout(() => {
          setPopupErr(false);
        }, 2000);
        localStorage.setItem('user', JSON.stringify(false));

        // alert(e.message);
      });

    // alert('Sign up');
  };

  //Handle SET NAME
  const handleSetNam = (e) => {
    let namedk = document.getElementById('namedk');
    let namelbdk = document.getElementById('namelbdk');
    if (namedk.value !== '') {
      namelbdk.classList.remove('label');
      namelbdk.classList.add('labelFocus');
      setNameIp(e.target.value);
    } else {
      namelbdk.classList.remove('labelFocus');
      namelbdk.classList.add('label');
    }
  };
  //Handle handleSetPass
  const handleSetPass = (e) => {
    let passdkip = document.getElementById('passdkip');
    let lblpassdk = document.getElementById('lblpassdk');
    if (passdkip.value !== '') {
      lblpassdk.classList.remove('label');
      lblpassdk.classList.add('labelFocus');
      setPasswordIp(e.target.value);
    } else {
      lblpassdk.classList.remove('labelFocus');
      lblpassdk.classList.add('label');
    }
  };

  //Handle Close
  const handleCloseSignUp = () => {
    signUp();
  };
  //google
  const handleGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(google)
      .then((rs) => {
        // let token = rs.credential.accessToken;
        let user = rs.user;
        localStorage.setItem('user', JSON.stringify(true));
        // console.log('User>>Google', user);
      })
      .catch((err) => {
        console.log('Error : handle error here>>', err.code);
      });
  };
  //Login handleFacebook
  const handleFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(facebook)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        console.log('User>>Facebook>', user);
        // ...
        //  userId = user.uid;
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
        console.error('Error: hande error here>Facebook>>', error.code);
      });
  };
  return (
    <React.Fragment>
      {' '}
      <div className="signup">
        <div className="signup__content">
          <div className="icon" onClick={handleCloseSignUp}>
            <CancelPresentationIcon />
          </div>
          <form onSubmit={(e) => SignUp(e)}>
            <h1>Instagram</h1>

            {/* <div onClick={handleFacebook}>Đăng nhập bằng facebook</div> */}
            <p>Đăng ký để xem ảnh và video từ bạn bè.</p>
            <div className="info">
              {' '}
              <label id="namelbdk" className="label">
                Name
              </label>
              <input
                id="namedk"
                type="name"
                name="name"
                onChange={(e) => handleSetNam(e)}
                // onChange={(e) => setNameIp(e.target.value)}
              />
            </div>
            <div className="info">
              {' '}
              <label id="lblpassdk" className="label">
                Password
              </label>
              <input
                id="passdkip"
                type="password"
                name="password"
                onChange={(e) => handleSetPass(e)}
                // onChange={(e) => setPasswordIp(e.target.value)}
              />{' '}
            </div>
            <input type="submit" value="Sign Up" className="btnsignin" />
            <div className="login" onClick={handleGoogle}>
              <h2>Đăng nhập bằng Google</h2>
            </div>
          </form>
        </div>
      </div>
      {popupErr && <Err err={err} />}
    </React.Fragment>
  );
}

export default SignUp;

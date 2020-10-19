import React, { useState } from 'react';
import { auth } from '../configFirebase';
import './SignUp.scss';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
function SignUp({ signUp }) {
  const [nameIp, setNameIp] = useState('');
  const [passwordIp, setPasswordIp] = useState('');
  const SignUp = (e) => {
    e.preventDefault();

    const promise = auth.createUserWithEmailAndPassword(nameIp, passwordIp);

    promise.catch((e) => alert(e.message));

    alert('Sign up');
  };

  //Handle Close
  const handleCloseSignUp = () => {
    signUp();
  };
  return (
    <div className="signup">
      <div className="signup__content">
        <div className="icon" onClick={handleCloseSignUp}>
          <CancelPresentationIcon />
        </div>
        <form onSubmit={(e) => SignUp(e)}>
          <h1>Instagram</h1>
          <div>
            {' '}
            <label>Name</label>
            <input
              type="name"
              name="name"
              onChange={(e) => setNameIp(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div>
            {' '}
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPasswordIp(e.target.value)}
            />
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
}

export default SignUp;

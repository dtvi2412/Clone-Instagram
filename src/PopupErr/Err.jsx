import React from 'react';
import './Err.scss';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
function Err({ err }) {
  return (
    <div className="err">
      <div className="err__content">
        <div className="icon">
          <ErrorOutlineIcon />
          <h1>{err && err}</h1>
        </div>
      </div>
    </div>
  );
}

export default Err;

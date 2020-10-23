import React from 'react';
import './Loading.scss';
function Loading() {
  const animationLoadding = () => {
    for (let i = 0; i < 3; i++) {
      return <div className="point"></div>;
    }
  };
  return (
    <div className="loading">
      {/* {animationLoadding()} */}

      <div className="point1"></div>
      <div className="point2"></div>
      <div className="point3"></div>
    </div>
  );
}

export default Loading;

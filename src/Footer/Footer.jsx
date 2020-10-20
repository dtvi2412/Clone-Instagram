import React from 'react';
import './Footer.scss';
import CopyrightIcon from '@material-ui/icons/Copyright';
function Footer() {
  return (
    <footer className="footer">
      <ul>
        <li>
          <a href="#">GIỚI THIỆU</a>
        </li>

        <li>
          <a href="#">TRỢ GIÚP</a>
        </li>
        <li>
          <a href="#">BÁO CHÍ</a>
        </li>
        <li>
          <a href="#">API</a>
        </li>
        <li>
          <a href="#">VIỆC LÀM</a>
        </li>
        <li>
          <a href="#">QUYỀN RIÊNG TƯ</a>
        </li>
        <li>
          <a href="#">ĐIỀU KHOẢN</a>
        </li>
        <li>
          <a href="#">VỊ TRÍ</a>
        </li>
        <li>
          <a href="#">TÀI KHOẢN LIÊN QUAN NHẤT</a>
        </li>
        <li>
          <a href="#">HASHTAG</a>
        </li>
        <li>
          <a href="#">NGÔN NGỮ</a>
        </li>
      </ul>
      <p>
        <CopyrightIcon />
        <h1> 2020 INSTAGRAM FROM FACEBOOK</h1>
      </p>
    </footer>
  );
}

export default Footer;

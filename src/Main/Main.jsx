import React, { useEffect, useState } from 'react';
import { auth } from '../configFirebase';
import './Main.scss';
import * as firebase from 'firebase';
import Loading from '../Loading/Loading';
import CopyrightIcon from '@material-ui/icons/Copyright';
import LoadingData from '../LoadingData/LoadingData';
import PageLoadInfo from '../PageLoadInfo/PageLoadInfo';
function Main() {
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [loadMain, setLoadMain] = useState(false);
  //DataPage in firebase
  const [dataPage, setDataPage] = useState([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let userImage = user.photoURL;
        let displayName = user.displayName;
        setImg(userImage);
        setName(displayName);
        setLoadMain(true);
        // console.log(user);
      } else {
        // No user is signed in.
        console.log('ERR');
      }
    });

    //GET LENGTH DATA
    let dataPageInFirebase = firebase.database().ref('dataPage');

    dataPageInFirebase.on('value', (notes) => {
      let arr = [];
      notes.forEach((ele) => {
        let obj = {};
        obj.id = ele.val().id;
        arr.push(obj);
      });
      setDataPage(arr);
    });
  }, []);
  const infoBox = [
    {
      id: 0,
      image:
        'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ec593cc431fb70007482137%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1321%26cropX2%3D3300%26cropY1%3D114%26cropY2%3D2093',
      name: 'Ronaldo',
    },
    {
      id: 1,
      image:
        'https://image.thanhnien.vn/660/uploaded/quanghuy/2020_08_29/messibucboi_djco.jpg',
      name: 'Messi',
    },
    {
      id: 2,
      image:
        'https://i.pinimg.com/originals/13/8c/6a/138c6abba3f9f1a8a85f01daa93dba28.jpg',
      name: 'Professor ',
    },
  ];
  //Data Goi y ket ban
  const dataMaybeFriend = [
    {
      id: 0,
      name: 'Đàm Tùng Vận',
      image:
        'https://ss-images.catscdn.vn/2020/02/09/6959705/untitled-13-1.jpg',
    },
    {
      id: 1,
      name: 'Vân Sơn',
      image:
        'https://avatar-nct.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453717938234_600.jpg',
    },
    {
      id: 2,
      name: 'Bảo Liêm',
      image:
        'https://vcdn-vnexpress.vnecdn.net/2015/08/06/2-1219-1438847976.jpg',
    },
    {
      id: 3,
      name: 'Lebron James',
      image:
        'https://i.pinimg.com/736x/b9/93/eb/b993eb9d72c91a3d843943c5641c2fb2.jpg',
    },
    {
      id: 4,
      name: 'Bill Gates',
      image:
        'https://image.thanhnien.vn/1080/uploaded/nthanhluan/2020_04_18/billgates_dlid.jpg',
    },
  ];

  const loadMaybeFriend = () => {
    return dataMaybeFriend.map((item) => {
      return (
        <div key={item.id} className="box__img">
          <div className="box__img__info">
            <div className="box__img__info__item">
              <div className="img">
                <img src={item.image} />
              </div>
              <div className="name">
                <h3>{item.name}</h3>
                <p>Gợi ý cho bạn</p>
              </div>
            </div>
          </div>
          <p className="theodoi">Theo dõi</p>
        </div>
      );
    });
  };
  //Handle Load Box Info
  const loadinfoIBox = () => {
    return infoBox.map((item) => {
      return (
        <div key={item.id} className="main__content__left__box__info">
          <div className="img">
            <img src={item.image} />
          </div>

          <p>{item.name}</p>
        </div>
      );
    });
  };

  //Handle Post Instagram
  const handlePostInstagram = () => {
    let database = firebase.database().ref('dataPage');
    console.log(dataPage.length);
    database.push({
      id: dataPage.length,
      name: auth.currentUser.displayName
        ? auth.currentUser.displayName
        : auth.currentUser.email,
      like: 0,
      avatar: auth.currentUser.photoURL
        ? auth.currentUser.photoURL
        : 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
      checkLike: false,
      image:
        'https://znews-photo.zadn.vn/w660/Uploaded/izhqv/2019_11_24/7A073345F2F74833860073F1EE4892DE.jpeg',
      description: 'Ok done',
      limit: 30,
      time: 'VỪA XONG',
    });
  };
  return (
    <React.Fragment>
      {loadMain ? (
        <div className="main">
          <div className="main__content">
            <div className="main__content__left">
              <div className="main__content__left__box">
                {/* Begin Load InfoBox */}
                {loadinfoIBox()}
                {/* End Load InfoBox */}
              </div>
              {/* Begin Loading Info Instagram */}
              <PageLoadInfo />
              {/* End loading info instagram */}
            </div>

            <div className="main__content__right">
              <div className="main__content__right__top">
                <div className="main__content__right__top__img">
                  {' '}
                  {img ? <img alt="avarta" src={img} /> : ''}
                </div>

                <div className="main__content__right__bottom">
                  {/* <h5>+</h5> */}
                  <h1>
                    {name ? name : <LoadingData />}
                    {/* POST INSTAGRAM */}
                    {/* <div onClick={() => handlePostInstagram()}>POST </div> */}
                    {/* END POST */}
                  </h1>
                </div>
              </div>
              {/* Goi y */}
              <div className="main__content__right__maybeFriend">
                <div className="goiy">
                  <h1>Gợi ý cho bạn</h1>
                  <a href="#">Xem tất cả</a>
                </div>
                <div className="box">
                  {/* box goi y friend  */}
                  {loadMaybeFriend()}
                  {/* end box  */}
                </div>
              </div>

              {/* Copy right */}
              <ul className="listcontent">
                <li>
                  <a href="#">Giới thiệu</a>
                </li>
                <li>
                  <a href="#">Trợ giúp</a>
                </li>
                <li>
                  <a href="#">Báo chí</a>
                </li>
                <li>
                  <a href="#">API</a>
                </li>
                <li>
                  <a href="#">Việc làm</a>
                </li>
                <li>
                  <a href="#">Quyền riêng tư</a>
                </li>
                <li>
                  <a href="#">Điều khoản</a>
                </li>
                <li>
                  <a href="#">Vị trí</a>
                </li>
                <li>
                  <a href="#">Tài khoản liên quan nhất</a>
                </li>
                <li>
                  <a href="#">Hashtag</a>
                </li>
                <li>
                  <a href="#">Ngôn ngữ</a>
                </li>
              </ul>
              {/* end copy right */}

              <div className="copyRight">
                <CopyrightIcon />
                <h1> 2020 INSTAGRAM FROM FACEBOOK</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
}

export default Main;

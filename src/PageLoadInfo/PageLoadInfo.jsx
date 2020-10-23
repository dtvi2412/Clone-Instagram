import React, { useEffect, useRef, useState } from 'react';
import './PageLoadInfo.scss';
import ListIcon from '@material-ui/icons/List';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { auth } from '../configFirebase';
import * as firebase from 'firebase';
function PageLoadInfo() {
  //Declare limit slice (Khai bao)
  const [limit, setLimit] = useState(30);
  const data = [
    {
      id: 0,
      name: 'damtungvan',
      avatar:
        'https://i-ngoisao.vnecdn.net/2020/08/26/top1-1598379522-4405-1598410311_900x540.jpg',
      image:
        'https://i.pinimg.com/originals/46/1a/9e/461a9e6b88369f04a636a2f1e44bbb3c.jpg',
      like: 49989,
      checkLike: true,
      description: '🥰🥰 #vận_mon #đàm_tùng_vận',
      comment: [
        {
          id: 0,
          name: 'jone09',
          message: 'Hello im your fan 🥰🥰',
        },
      ],
      time: '7 GIỜ TRƯỚC',
    },
    {
      id: 1,
      name: 'cristiano',
      avatar:
        'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ec593cc431fb70007482137%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1321%26cropX2%3D3300%26cropY1%3D114%26cropY2%3D2093',
      image:
        'https://kenh14cdn.com/thumb_w/640/2020/10/21/photo-1-1603290669360489428045-crop-16032909646131600528471.jpg',
      like: 11684457,
      checkLike: false,
      description: 'Thursday style! 😉 ',
      time: '15 GIỜ TRƯỚC',
    },
    {
      id: 2,
      name: 'damtungvan',
      avatar:
        'https://i-ngoisao.vnecdn.net/2020/08/26/top1-1598379522-4405-1598410311_900x540.jpg',
      image:
        'https://photo-1-baomoi.zadn.vn/w1000_r1/2020_01_12_329_33628577/5cf22328806b6935307a.jpg',
      like: 10980,
      checkLike: true,
      limit: limit,
      description:
        '喜欢你，却不一定爱你，爱你就一定很喜欢你, 可能我只是你生命里的一个过客但你不会遇见第个我 😉😉😉',
      time: '1 NGÀY TRƯỚC',
    },
    {
      id: 3,
      name: 'd_a___m_i',
      avatar:
        'https://cdn.voh.com.vn/voh/Image/2020/03/17/9192882uh7md7c95sgv7_20200317114546.jpg',
      image:
        'https://i.pinimg.com/originals/7d/27/af/7d27af7f38b8270e95438feb30a4b39d.jpg',
      like: 29801,
      checkLike: true,
      limit: limit,
      description:
        '밤이란 바로 해가뜨기 직전에 가장 어두운 것이다, 강한 이의 슬픔은 아름답다. 😋😋😋',
      time: '2 NGÀY TRƯỚC',
    },
    {
      id: 4,
      name: 'Riot Games',
      avatar:
        'https://image.thanhnien.vn/660/uploaded/vietthong/2020_03_27/thumb_klgv.png',
      image:
        'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltef4fb78c2f4a8511/5f52d5fe4c9f7223b8cd95ae/05_Lee_Sin_Splash.jpg',
      like: 11988,
      checkLike: false,
      limit: limit,
      description:
        'A WARRIOR ASCETIC CONSUMED WITH AN ELECTRIC PASSION FOR JUSTICE, LEE SIN CLIMBED THE MOUNTAIN OF THE STORM DRAGON, HOPING TO RECEIVE HIS BLESSING. HAVING RETURNED FROM THE SUMMIT AS A LEGENDARY DRAGONMANCER, LEE SIN NOW DOLES OUT THUNDEROUS PUNISHMENT TO VILLAINS EVERYWHERE—EVER UNDER THE WATCHFUL EYE OF HIS DRACONIC PATRON.😍😍😍',
      time: '5 NGÀY TRƯỚC',
    },
  ];
  const [dataPage, setDataPage] = useState([]);

  ///DATA IN DATAPAGE
  useEffect(() => {
    setDataPage(data);
  }, []);

  const input = useRef();
  // console.log(input);
  //Handle Add Message
  const handleAddMessage = () => {
    //Cach2 de lay nhieu class
    let valueInput = document.querySelectorAll('.valueInput');
    let buttonID = document.querySelectorAll('.button');

    for (let i = 0; i < valueInput.length; i++) {
      if (valueInput[i].value !== '') {
        buttonID[i].setAttribute('style', 'opacity:1;pointer-events: visible');
      } else if (valueInput[i].value === '') {
        buttonID[i].setAttribute('style', 'opacity:0.4;pointer-events:none');
      }
    }
  };
  // Handle push message
  const handlePushMessage = (id) => {
    let valueInput = document.querySelectorAll('.valueInput');
    let buttonID = document.querySelectorAll('.button');
    for (let i = 0; i < valueInput.length; i++) {
      if (i === id) {
        // alert(valueInput[i].value);
        // console.log(valueInput[i].value);
        valueInput[i].value = '';
        buttonID[i].setAttribute('style', 'opacity:0.4;pointer-events:none');
      }
    }
  };

  // Handle Like

  const handleLike = (id) => {
    let cloneDat = [...dataPage];

    cloneDat.map((item) => {
      //CACH 1
      if (item.id === id) {
        if (!item.checkLike) {
          item.like = item.like + 1;
          item.checkLike = !item.checkLike;
          setDataPage({
            ...item,
          });
        } else {
          item.like = item.like - 1;
          item.checkLike = !item.checkLike;
          setDataPage({
            ...item,
          });
        }

        setDataPage({ ...item });
      } else {
        // console.log('item2', item);
        setDataPage({ ...item });
      }
    });

    // console.log(cloneDat);
    setDataPage(cloneDat);
  };

  //Handle View More
  const handleViewMore = (id) => {
    let cloneData = [...dataPage];
    cloneData.map((item) => {
      if (item.id === id) {
        item.limit = item.limit + 400;
        setDataPage({ ...item });
        // setLimit(limit + 200);
      }
      setDataPage({ ...item });
    });
    setDataPage(cloneData);
  };

  //Handle Load Item Page
  const loadItemPage = () => {
    if (dataPage !== null) {
      return dataPage?.map((item) => {
        return (
          <div key={item.id} className="product__content__item">
            {/* Avarta */}
            <div className="product__content__item__first">
              <div className="product__content__item__first__left">
                <div className="img">
                  <img src={item.avatar} alt="Avarta image" />
                </div>
                <p>{item.name}</p>
              </div>
              <div className="product__content__item__first__right">
                <ListIcon />
              </div>
            </div>
            {/* end Avartar */}
            {/* Begin Image Full */}
            <div className="product__content__item__containImage">
              <img src={item.image} />
            </div>
            {/* End Image  */}

            {/* Begin Box Like */}
            <div className="product__content__item__like">
              <div className="product__content__item__like__left">
                {item.checkLike ? (
                  <FavoriteIcon
                    className={`${item.checkLike ? 'like' : 'unlike'}`}
                    onClick={() => handleLike(item.id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className={`${item.checkLike ? 'like' : 'unlike'}`}
                    onClick={() => handleLike(item.id)}
                  />
                )}
                {/* <FavoriteIcon
                  className={`${item.checkLike ? 'like' : 'unlike'}`}
                  onClick={() => handleLike(item.id)}
                /> */}
                <ChatBubbleOutlineIcon />
                <ShareIcon />
              </div>
              <div className="product__content__item__like__right">
                <BookmarkBorderIcon />
              </div>
            </div>
            {/* End Box Like */}
            {/* View Like */}
            <div className="product__content__item__view">
              <p>{item.like.toLocaleString()} lượt thích</p>
            </div>
            {/* End view Like */}
            {/* Name and Comment */}
            <div className="product__content__item__comment">
              <h1>{item.name}</h1>
              <p>
                {item.description.length > item.limit ? (
                  <React.Fragment>
                    {`${item.description.slice(0, item.limit)}... `}
                    <span
                      className="xemThem"
                      onClick={() => {
                        // setLimit(limit + 200);
                        handleViewMore(item.id);
                      }}
                    >
                      thêm
                    </span>
                  </React.Fragment>
                ) : (
                  item.description
                )}
              </p>
            </div>
            {/* End Name and comment */}

            {/* Begin send Comment */}
            {item.comment?.map((ms) => {
              return (
                <div
                  key={ms.id}
                  className="product__content__item__sendMessage"
                >
                  <h1>{ms.name}</h1>
                  <p>{ms.message}</p>
                </div>
              );
            })}
            {/* End send Comment */}

            {/* Begin Time */}
            <div className="product__content__item__time">
              <p>{item.time}</p>
            </div>
            {/* End Time */}
            {/* Begin Add Message */}
            <div className="product__content__item__message">
              <input
                ref={input}
                placeholder="Thêm bình luận..."
                onChange={handleAddMessage}
                className="valueInput"
              />
              <button
                onClick={() => {
                  handlePushMessage(item.id);
                }}
                className="button"
              >
                Đăng
              </button>
            </div>
            {/* End Add Message */}
          </div>
        );
      });
    }
  };
  return (
    <div className="product">
      <div className="product__content">
        {/* Begin Load Item Page */}
        {loadItemPage()}

        {/* End Load Item Page */}
      </div>
    </div>
  );
}

export default PageLoadInfo;

import React, { useEffect, useRef, useState } from 'react';
import './PageLoadInfo.scss';
import ListIcon from '@material-ui/icons/List';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { auth, configFirebase } from '../configFirebase';
import * as firebase from 'firebase';

import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingData from '../LoadingData/LoadingData';
import LoadingDataPage from '../LoadingDataPage/LoadingDataPage';
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
    {
      id: 5,
      name: 'Vân Sơn',
      avatar:
        'https://avatar-nct.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453717938234_600.jpg',
      image: 'https://i.ytimg.com/vi/K4zCYvKZAXA/maxresdefault.jpg',
      like: 78333,
      checkLike: true,
      limit: limit,
      description:
        'VAN SON 😊 Cambodia Film Hài Part 1| Đạo Nghĩa Giang Hồ | Vân Sơn- Bảo Liêm- Việt Thảo',
      time: '5 NGÀY TRƯỚC',
    },
    {
      id: 6,
      name: 'Vân Sơn',
      avatar:
        'https://avatar-nct.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453717938234_600.jpg',
      image: 'https://i.ytimg.com/vi/af1WG2VvY0U/maxresdefault.jpg',
      like: 86000,
      checkLike: true,
      limit: limit,
      description:
        'VAN SON 😊 Hài Kịch | NGƯỜI BẠN TỐT | Vân Sơn - Bảo Liêm - Quang Minh - Hồng Đào - Diểm Liên',
      time: '6 NGÀY TRƯỚC',
    },
    {
      id: 7,
      name: 'kingjames',
      avatar:
        'https://i.pinimg.com/736x/b9/93/eb/b993eb9d72c91a3d843943c5641c2fb2.jpg',
      image:
        'https://www.bosshunting.com.au/wp-content/uploads/2020/05/art_and_motion_news_554_cAmqeX_lebronjames-action-2-scaled.jpg',
      like: 105983,
      checkLike: true,
      limit: limit,
      description:
        'Year 17 and Still At It! 😤😤😤 Lets Go!!#RevengeSeasonContinuesSoon #ThekidfromAKRON🤴🏾 #WashedKing👑 #KingMe👑 #PlatiumBeardShii',
      time: '7 NGÀY TRƯỚC',
    },
  ];
  const [dataPage, setDataPage] = useState([]);
  //Create Comment
  // let localComment = JSON.parse(localStorage.getItem('comment'));
  // const [comment, setComment] = useState(
  //   localComment === null ? [] : localComment
  // );

  //Comment in Database Firebase
  const [comment, setComment] = useState([]);
  ///DATA IN DATAPAGE
  useEffect(() => {
    // console.log('display Name: ', auth.currentUser.displayName);
    // console.log('AUTH : ', auth.currentUser.email);

    // setDataPage(data);

    //GET DATAPAGE FIREBASE
    let dataPageFirebase = firebase.database().ref('dataPage');

    dataPageFirebase.on('value', (notes) => {
      let arr = [];
      notes.forEach((element) => {
        let obj = {};
        obj.id = element.val().id;
        obj.avatar = element.val().avatar;
        obj.checkLike = element.val().checkLike;
        obj.description = element.val().description;
        obj.image = element.val().image;
        obj.like = element.val().like;
        obj.name = element.val().name;
        obj.limit = element.val().limit;
        obj.time = element.val().time;
        arr.push(obj);
      });
      setDataPage(arr);
    });

    //GET DATA COMMENT

    let database = firebase.database().ref('commentNow');

    database.on('value', (notes) => {
      let arr = [];
      notes.forEach((element) => {
        let obj = {};
        obj.id = element.key;
        obj.idUser = element.val().idUser;
        obj.name = element.val().name;
        obj.message = element.val().message;
        obj.mail = element.val().mail;
        arr.push(obj);
      });
      // console.log('arr', arr);
      setComment(arr);
    });
  }, []);

  useEffect(() => {
    //Set Comment Local
    // localStorage.setItem('comment', JSON.stringify(comment));
  }, [comment]);
  //const push Data

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
        let db = firebase.database().ref('commentNow');

        db.push({
          id: Date.now(),
          idUser: id,
          name:
            auth.currentUser.displayName === null
              ? ''
              : auth.currentUser.displayName,
          message: valueInput[i].value,
          mail: auth.currentUser.email,
        });

        //Create Data comment with USER
        // setComment([
        //   ...comment,
        //   {
        //     id: Date.now(),
        //     idUser: id,
        //     message: valueInput[i].value,
        //     // time: new Date().getHours(),
        //     name: auth.currentUser.displayName,
        //     email: auth.currentUser.email,
        //   },
        // ]);

        valueInput[i].value = '';
        buttonID[i].setAttribute('style', 'opacity:0.4;pointer-events:none');
      }
    }
    // setComment(cloneMess);
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
  //PAGE

  const [page, setPage] = useState(1);
  const fetDataLoad = () => {
    const randomLike = Math.floor(Math.random() * 1000000);

    const arrImage = [
      {
        image:
          'https://image3.tienphong.vn/w665/Uploaded/2020/dg_bfjysszl/2020_08_22/1_tdqy.jpg',
        name: 'amana19',
        description:
          'Ông trời đã ban cho tôi nhan sắc, Nhưng lại lấy đi những người công nhận điều đó😭😭😭😭',
      },
      {
        image:
          'https://media.thethao247.vn/upload/cuongnm/2020/04/28/guc-nga-truoc-nhan-sac-cua-hot-girl-bong-ro-xinh-dep-nhat-trung-quoc1588047165.jpg',
        name: 'beatrix19',
        description:
          'Trái tim anh là nơi dù có đi đến tận cùng thế giới, em vẫn muốn quay trở về.🤗🤗',
      },
      {
        image:
          'https://photo-1-baomoi.zadn.vn/w1000_r1/2020_05_02_180_34912744/288e03366d75842bdd64.jpg',
        name: 'Gwen',
        description:
          'Vốn định sẵn là không duyên..cớ sau ông trời lại cho ta gặp gỡ.🤗🤗🤗',
      },
      {
        image:
          'https://icdn.dantri.com.vn/thumb_w/640/2020/07/21/nhung-hot-girl-viet-chuan-bi-buoc-vao-ky-thi-tot-nghiep-thpt-quoc-gia-nam-naydocx-1595346639604.jpeg',
        name: 'helen99',
        description:
          'Tôi muốn ăn ít đi,Cho lòng nhẹ nhàng nhất, Tôi muốn ăn ít lại, Cho mình dừng cute!🤗🤗🤗🤗🤗',
      },
      {
        image:
          'https://photo-1-baomoi.zadn.vn/w1000_r1/2020_04_15_180_34718461/cf6ada6aa3294a771338.jpg',
        name: 'irene',
        description:
          'Các bạn FA đừng có than thở là trung thu không có gấu nữa. Vì bình thường các bạn cũng làm gì có gấu đâu.🤗😛🤗😛🤗😛🤗😛',
      },
      {
        image:
          'https://tapchisieuxe.com/uploads/images/bai-viet/van-hoa-sieu-xe/van-hoa-do-xe-nhat-ban/van-hoa-do-sieu-xe-o-nhat-ban-doc-dao-va-dien-ro-so-mot-the-gioi-0.jpg',
        name: 'Bosozoku ',
        description: 'Lực xe tốt, dàn hơi tốt 😉😉😉',
      },
      {
        image:
          'https://cuocsongantoan.vn/stores/news_dataimages/hang.nguyen/032020/27/10/lap-sai-cap-canh-cua-lamborghini-trieu-hoi-26-sieu-xe-aventador-svj-59-.0970.jpg',
        name: 'Aventador SVJ',
        description:
          'Hãy là chính mình bình thường chứ không tầm thường ✍️✍️✍️',
      },
      {
        image: 'https://hvuh.edu.vn/wp-content/uploads/2018/10/c02-2_jpg.jpg',
        name: 'store88',
        description:
          'SÁCH LÀ NƠI LƯU GIỮ NỀN VĂN MINH, KHÔNG CÓ SÁCH, LỊCH SỬ TRẦM LẶNG, VĂN CHƯƠNG BUỒN CHÁN✍️✍️✍️',
      },
    ];
    const randomImage = Math.floor(Math.random() * arrImage.length);

    if (dataPage.length > 20) {
      return (
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      );
    } else {
      setTimeout(() => {
        setDataPage(
          dataPage.concat({
            id: dataPage.length,
            // name: 'JOHN',
            avatar: arrImage[randomImage].image,
            image: arrImage[randomImage].image,
            checkLike: false,
            description: `${arrImage[randomImage].description}`,
            like: randomLike,
            limit: 30,
            name: arrImage[randomImage].name,
            time: 'VỪA XONG',
          })
        );
      }, 1500);
    }
  };

  //Handle Count Comment
  // const [countComment, setCountComment] = useState(0);
  // const handleXemComment = (id) => {
  //   let cm = comment.filter((item) => item.idUser === id);
  //   console.log('Comment', cm.length);
  //   setCountComment(cm.length);
  // };

  //Handle Load Item Page
  const loadItemPage = () => {
    if (dataPage.length === 0) {
      // return <LoadingData />;
      return <LoadingDataPage />;
    }
    if (dataPage.length !== 0) {
      return (
        //Scroll Infinity

        <InfiniteScroll
          dataLength={dataPage.length}
          // next={() => setPage(page + 1)}
          next={() => fetDataLoad()}
          loader={
            <h4 id="loa" style={{ textAlign: 'center' }}>
              Loading...
            </h4>
          }
          hasMore={true}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {dataPage?.map((item) => {
            return (
              <div key={item.id} className="product__content__item">
                {/* Avarta */}
                <div className="product__content__item__first">
                  <div className="product__content__item__first__left">
                    <div className="img">
                      <img src={item?.avatar} alt="Avarta image" />
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
                  <img src={item?.image} />
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
                  <p>
                    {item.like ? item?.like.toLocaleString() : item.like} lượt
                    thích
                  </p>
                </div>
                {/* End view Like */}
                {/* Name and Comment */}
                <div className="product__content__item__comment">
                  <h1>{item.name}</h1>
                  <p>
                    {item.description &&
                    item?.description.length > item.limit ? (
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
                    {/* {} */}
                  </p>
                </div>
                {/* End Name and comment */}

                {/* Begin send Comment */}

                {comment?.map((ms) => {
                  if (item.id === ms.idUser) {
                    return (
                      <div
                        key={ms.id}
                        className="product__content__item__sendMessage"
                      >
                        {/* <h1
                          onClick={() => {
                            handleXemComment(item.id);
                          }}
                        >
                          Xem tất cả bình luận{countComment}
                        </h1> */}
                        {/* If name null load name = email */}
                        {ms.name === '' ? (
                          // <h1>{ms.email}</h1>
                          <h1>{ms.mail}</h1>
                        ) : (
                          <h1>{ms.name}</h1>
                        )}

                        <p>{ms.message}</p>
                      </div>
                    );
                  }
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
          })}
        </InfiniteScroll>

        //End Scroll Infinity
      );
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

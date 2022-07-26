import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { userAction } from "../../redux/module/post";
import CategorySlide from "./PostSlide";
import WebShare from "../share/WebShare";
import "swiper/css";
import "../../css/postItem.scss";
import user from "../../assets/user.png";
import bookmarkEmpty from "../../assets/bookmark.png";
import bookmarkBlue from "../../assets/bookmark-blue.png";
import share from "../../assets/share.png";
import heartEmpty from "../../assets/heart.png";
import heartFull from "../../assets/heartpaint.png";

const PostItem = (props) => {
  const dispatch = useDispatch();

  const {
    bookmarkCount,
    userImgUrl,
    nickName,
    title,
    imgUrl,
    regionCategory,
    themeCategory,
    priceCategory,
    loveCount,
    bookmarkStatus,
    loveStatus,
    postId,
  } = props;

  const Id = useSelector((state) => state.post.postId);

  const is_bookmarkCount = bookmarkCount ? true : false;

  const [shareMove, setShareMove] = useState(false);

  const webShare = () => {
    setShareMove(!shareMove);
  };

  return (
    <>
      {shareMove ? (
        <WebShare
          webShare={webShare}
          title={title}
          imgUrl={imgUrl}
          loveCount={loveCount}
          postId={postId}
          regionCategory={regionCategory}
          priceCategory={priceCategory}
          themeCategory={themeCategory}
        />
      ) : null}
      <div className="postItem-content">
        <div className="postItem-title">
          <div className="postItem-user">
            {userImgUrl ? (
              <img src={userImgUrl} alt="profile" />
            ) : (
              <img src={user} alt="default-profile" />
            )}
            <p>{nickName}</p>
          </div>
          <div className="postItem-click">
            <img
              src={share}
              alt="share"
              onClick={webShare}
              className="postItem-shareicon"
            />
            {is_bookmarkCount ? (
              <button
                onClick={() => dispatch(userAction.mainBookmarkDB(postId))}
              >
                {postId === Id ? (
                  bookmarkStatus === true ? (
                    <img
                      src={bookmarkBlue}
                      alt="bookmarkBlue"
                      className="postItem-bookmarkicon"
                    />
                  ) : (
                    <img
                      src={bookmarkEmpty}
                      alt="bookmarkEmpty"
                      className="postItem-bookmarkicon"
                    />
                  )
                ) : bookmarkStatus === true ? (
                  <img
                    src={bookmarkBlue}
                    alt="bookmarkBlue"
                    className="postItem-bookmarkicon"
                  />
                ) : (
                  <img
                    src={bookmarkEmpty}
                    alt="bookmarkEmpty"
                    className="postItem-bookmarkicon"
                  />
                )}
              </button>
            ) : (
              <button
                onClick={() => dispatch(userAction.clickBookmarkDB(postId))}
              >
                {postId === Id ? (
                  bookmarkStatus === true ? (
                    <img
                      src={bookmarkBlue}
                      alt="bookmarkBlue"
                      className="postItem-bookmarkicon"
                    />
                  ) : (
                    <img
                      src={bookmarkEmpty}
                      alt="bookmarkEmpty"
                      className="postItem-bookmarkicon"
                    />
                  )
                ) : bookmarkStatus === true ? (
                  <img
                    src={bookmarkBlue}
                    alt="bookmarkBlue"
                    className="postItem-bookmarkicon"
                  />
                ) : (
                  <img
                    src={bookmarkEmpty}
                    alt="bookmarkEmpty"
                    className="postItem-bookmarkicon"
                  />
                )}
              </button>
            )}
          </div>
        </div>
        <Link to={`/detail/${postId}`}>
          <CategorySlide image={imgUrl} title={title} />
        </Link>
        <div className="postItem-category">
          <Swiper
            className="postItem-categorybutton"
            slidesPerView={3}
            breakpoints={{
              300: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide className="postItem-area-button-content">
              <button className="postItem-area-button">
                #{regionCategory}
              </button>
            </SwiperSlide>
            {themeCategory.map((value, index) => {
              return (
                <SwiperSlide
                  className="postItem-theme-button-content"
                  key={index}
                >
                  <button className="postItem-theme-button">
                    #{value.themeCategory}
                  </button>
                </SwiperSlide>
              );
            })}
            <SwiperSlide className="postItem-price-button-content">
              <button className="postItem-price-button">
                #{priceCategory}
              </button>
            </SwiperSlide>
          </Swiper>
          <div className="postItem-heart">
            {is_bookmarkCount ? (
              <button onClick={() => dispatch(userAction.mainLoveDB(postId))}>
                {postId === Id ? (
                  loveStatus === true ? (
                    <img src={heartFull} alt="heartFull" />
                  ) : (
                    <img src={heartEmpty} alt="heartEmpty" />
                  )
                ) : loveStatus === true ? (
                  <img src={heartFull} alt="heartFull" />
                ) : (
                  <img src={heartEmpty} alt="heartEmpty" />
                )}
              </button>
            ) : (
              <button onClick={() => dispatch(userAction.clickLoveDB(postId))}>
                {postId === Id ? (
                  loveStatus === true ? (
                    <img src={heartFull} alt="heartFull" />
                  ) : (
                    <img src={heartEmpty} alt="heartEmpty" />
                  )
                ) : loveStatus === true ? (
                  <img src={heartFull} alt="heartFull" />
                ) : (
                  <img src={heartEmpty} alt="heartEmpty" />
                )}
              </button>
            )}

            <p>{loveCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostItem;

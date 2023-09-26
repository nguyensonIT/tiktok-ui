import Image from "../Image";
import Button from "../Button";
import { wrapper as PopperWrapper } from "../Popper";
import * as followingAccountsService from "../../services/followingAccountsService";

import classNames from "classnames/bind";
import styles from "./Video.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import AccountPreview from "../AccountsSideBar/AccountPreview";
import VideoItem from "./VideoItem";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDataUserFollow } from "../../redux/actions";
import { HomeContext } from "../../pages/Home";

const cx = classNames.bind(styles);
function Video({ dataVideo }) {
  const [isFollowed, setIsFollowed] = useState(dataVideo?.user?.is_followed);
  const { userFollow, setUserFollow } = useContext(HomeContext);
  const dispatch = useDispatch();
  const renderPreview = () => {
    return (
      <PopperWrapper>
        <AccountPreview
          data={dataVideo.user}
          isFollowed={isFollowed}
          isPreviewInVideo={true}
          handleUnFollowUser={handleUnFollowUser}
          handleFollowUser={handleFollowUser}
        />
      </PopperWrapper>
    );
  };

  const fetchFollow = async (id) => {
    await followingAccountsService
      .fetchFollowUser(id)
      .then((res) => dispatch(changeDataUserFollow(res.data)))
      .catch((err) => console.log(err));
  };
  const fetchUnfollow = async (id) => {
    await followingAccountsService
      .fetchUnFollowUser(id)
      .then((res) => dispatch(changeDataUserFollow(res.data)))
      .catch((err) => console.log(err));
  };
  const handleFollowUser = () => {
    fetchFollow(dataVideo?.user?.id);
    setUserFollow({ id: dataVideo?.user?.id, is_follow: true });
    setIsFollowed(true);
  };
  const handleUnFollowUser = () => {
    fetchUnfollow(dataVideo?.user?.id);
    setUserFollow({ id: dataVideo?.user?.id, is_follow: false });
    setIsFollowed(false);
  };

  useEffect(() => {
    if (userFollow.id === dataVideo?.user?.id && userFollow.is_follow) {
      setIsFollowed(true);
    }
    if (userFollow.id === dataVideo?.user?.id && !userFollow.is_follow) {
      setIsFollowed(false);
    }
  }, [userFollow]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("left")}>
          <div>
            <Tippy
              interactive
              render={renderPreview}
              delay={[800, 0]}
              placement="bottom-start"
            >
              <Image
                src={dataVideo.user.avatar}
                alt={dataVideo.user.nickname}
                className={cx("image")}
              />
            </Tippy>
          </div>
        </div>
        <div className={cx("right")}>
          <div className={cx("right-wrapper")}>
            <div className={cx("info")}>
              <div>
                <Tippy
                  interactive
                  render={renderPreview}
                  delay={[800, 0]}
                  placement="bottom-start"
                >
                  <div className={cx("info-user")}>
                    <span className={cx("name")}>
                      {`${dataVideo.user.first_name} ${dataVideo.user.last_name}`}
                    </span>
                    <span>
                      {dataVideo.user.tick && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className={cx("icon-check")}
                        />
                      )}
                    </span>
                    <span className={cx("nickname")}>
                      {" "}
                      {dataVideo.user.nickname}
                    </span>
                  </div>
                </Tippy>
              </div>
              <div className={cx("box-content-text")}>
                <span className={cx("content-text")}>
                  {dataVideo.description}
                </span>
                <span className={cx("content-tag")}> #hoaa #hoaa</span>
              </div>
              <div className={cx("name-music")}>
                <FontAwesomeIcon icon={faMusic} className={cx("icon-music")} />
                <Link to="#" className={cx("music-link")}>
                  {" "}
                  {dataVideo.music}
                </Link>
              </div>
            </div>
            <div>
              {isFollowed ? (
                <Button
                  onClick={() => handleUnFollowUser()}
                  outline
                  className={cx("following-btn-video")}
                >
                  Following
                </Button>
              ) : (
                <Button
                  onClick={handleFollowUser}
                  className={cx("follow-btn-video")}
                  outline
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
          <div className={cx("container-video")}>
            <VideoItem data={dataVideo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;

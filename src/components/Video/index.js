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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDataUserFollow } from "../../redux/actions";

const cx = classNames.bind(styles);
function Video({ dataVideo }) {
    const dataUserFollow = useSelector((state) => state.dataUserFollow);

    const dispatch = useDispatch();
    const renderPreview = () => {
        return (
            <PopperWrapper>
                <AccountPreview
                    data={dataVideo.user}
                    isPreviewInVideo={true}
                    renderButtonFollow={renderButtonFollow}
                    renderButtonDataMain={renderButtonDataMain}
                    handleUnFollowUser={handleUnFollowUser}
                    handleFollowUser={handleFollowUser}
                />
            </PopperWrapper>
        );
    };
    const renderButtonFollow = (data, id) => {
        const item = data.find((item) => item.id === id);
        if (item?.is_followed) {
            return (
                <Button
                    onClick={() => handleUnFollowUser(id)}
                    outline
                    className={cx("following-btn-video")}
                >
                    Following
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={() => handleFollowUser(id)}
                    outline
                    className={cx("follow-btn-video")}
                >
                    Follow
                </Button>
            );
        }
    };
    const renderButtonDataMain = (data, id) => {
        const check = data.id === id;
        if (data.is_followed && check) {
            return (
                <Button
                    onClick={() => handleUnFollowUser(id)}
                    outline
                    className={cx("following-btn-video")}
                >
                    Following
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={() => handleFollowUser(id)}
                    outline
                    className={cx("follow-btn-video")}
                >
                    Follow
                </Button>
            );
        }
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
    const handleFollowUser = (id) => {
        fetchFollow(id);
    };
    const handleUnFollowUser = (id) => {
        fetchUnfollow(id);
    };
    // useEffect(() => {
    //     idUserFollow && fetchFollow(idUserFollow);
    // }, [idUserFollow]);
    // useEffect(() => {
    //     idUserUnfollow && fetchUnfollow(idUserUnfollow);
    // }, [idUserUnfollow]);
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
                                <span className={cx("content-tag")}>
                                    {" "}
                                    #hoaa #hoaa
                                </span>
                            </div>
                            <div className={cx("name-music")}>
                                <FontAwesomeIcon
                                    icon={faMusic}
                                    className={cx("icon-music")}
                                />
                                <Link to="#" className={cx("music-link")}>
                                    {" "}
                                    {dataVideo.music}
                                </Link>
                            </div>
                        </div>
                        <div>
                            {/* <Button
                                onClick={() => handleFollowUser(dataVideo)}
                                outline
                                className={cx("following-btn-video")}
                            >
                                Following
                            </Button> */}
                            {dataUserFollow.length > 0
                                ? renderButtonFollow(
                                      dataUserFollow,
                                      dataVideo.user.id
                                  )
                                : renderButtonDataMain(
                                      dataVideo.user,
                                      dataVideo.user.id
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

import styles from "./Profile.module.scss";

import * as followingAccountsService from "../../services/followingAccountsService";

import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import LikedTab from "./component/LikedTab";
import VideosTab from "./component/VideosTab";
import { getAnUser } from "../../services/getAnUserService";
import { globalContext } from "../../components/GlobalContext";
import InfoProfile from "./component/InfoProfile";
import NoVideo from "./component/NoVideo";
import { displayFormLogin } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);
function Profile() {
    const { nickname } = useParams();
    const token = localStorage.getItem("token");

    const dispatch = useDispatch();
    const [dataAnUser, setDataAnUser] = useState({});

    const { userFollow, setUserFollow } = useContext(globalContext);
    const [isFollowed, setIsFollowed] = useState(null);

    const [isLikedVideoForMe, setIsLikeVideoForMe] = useState(false);
    const [activeTabLiked, setActiveTabLiked] = useState(false);
    const [activeTabVideo, setActiveTabVideo] = useState(true);

    const nicknameYourself = useSelector((state) => state.dataUser.nickname);
    const [isProfileYourself, setIsProfileYourself] = useState(
        nickname === `@${nicknameYourself}`
    );

    const handleTabVideos = () => {
        setActiveTabLiked(false);
        setActiveTabVideo(true);
    };
    const handleTabLiked = () => {
        setActiveTabLiked(true);
        setActiveTabVideo(false);
    };
    const fetchFollow = async (id) => {
        await followingAccountsService
            .fetchFollowUser(id)
            .catch((err) => console.log(err));
    };
    const fetchUnfollow = async (id) => {
        await followingAccountsService
            .fetchUnFollowUser(id)
            .catch((err) => console.log(err));
    };

    const handleFollowUser = () => {
        if (token) {
            fetchFollow(dataAnUser?.id);
            setUserFollow({ id: dataAnUser?.id, is_follow: true });
            setIsFollowed(true);
        } else {
            dispatch(displayFormLogin(true));
        }
    };
    const handleUnFollowUser = () => {
        fetchUnfollow(dataAnUser?.id);
        setUserFollow({ id: dataAnUser?.id, is_follow: false });
        setIsFollowed(false);
    };
    useEffect(() => {
        if (userFollow.id === dataAnUser?.id && userFollow.is_follow) {
            setIsFollowed(true);
        }
        if (userFollow.id === dataAnUser?.id && !userFollow.is_follow) {
            setIsFollowed(false);
        }
    }, [userFollow]);

    useEffect(() => {
        setIsProfileYourself(nickname === `@${nicknameYourself}`);
        getAnUser(nickname)
            .then((res) => {
                setDataAnUser(res.data);
                setIsFollowed(res.data.is_followed);
            })
            .catch((err) => console.log(err));
    }, [nickname]);
    return (
        <div className={cx("wrapper")}>
            {/* box top */}
            <InfoProfile
                isFollowed={isFollowed}
                dataAnUser={dataAnUser}
                handleFollowUser={handleFollowUser}
                handleUnFollowUser={handleUnFollowUser}
                isProfileYourself={isProfileYourself}
            />
            {/* box bottom */}
            <div className={cx("wrapper-content")}>
                {/* Feed tab */}
                <div className={cx("wrap-feedtab")}>
                    <p
                        className={cx("tab", {
                            activeTabVideo: activeTabVideo,
                            hoverTabVideo: true,
                        })}
                        onClick={handleTabVideos}
                    >
                        <span>Videos</span>
                    </p>
                    <p
                        className={cx("tab", {
                            activeTabLiked: activeTabLiked,
                            hoverTabLiked: true,
                        })}
                        onClick={handleTabLiked}
                    >
                        <FontAwesomeIcon
                            icon={faLock}
                            className={cx("icon-lock")}
                        />
                        <span>Liked</span>
                    </p>
                    <div className={cx("line")}></div>
                </div>
                {activeTabVideo &&
                    (dataAnUser?.videos?.length > 0 ? (
                        <VideosTab dataVideoAnUSer={dataAnUser.videos} />
                    ) : isProfileYourself ? (
                        <NoVideo
                            title="Upload your first video"
                            desc="Your videos will appear here"
                        />
                    ) : (
                        <NoVideo />
                    ))}
                {activeTabLiked && (
                    <LikedTab isLikedVideoForMe={isLikedVideoForMe} />
                )}
            </div>
        </div>
    );
}

export default Profile;

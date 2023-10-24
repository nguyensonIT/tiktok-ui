import styles from "./AccountsSideBar.module.scss";
import Image from "../Image";
import { wrapper as PopperWrapper } from "../Popper";
import AccountPreview from "./AccountPreview";
import * as followingAccountsService from "../../services/followingAccountsService";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { globalContext } from "../GlobalContext";
import { useDispatch } from "react-redux";
import { displayFormLogin } from "../../redux/actions";

const cx = classNames.bind(styles);
function AccountItems({ data, isLogin = false }) {
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const [isFollowed, setIsFollowed] = useState(data?.is_followed);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);

    const { userFollow, setUserFollow } = useContext(globalContext);

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
            fetchFollow(data?.id);
            setUserFollow({ id: data?.id, is_follow: true });
            setIsFollowed(true);
        } else {
            dispatch(displayFormLogin(true));
        }
    };
    const handleUnFollowUser = () => {
        if (token) {
            fetchUnfollow(data?.id);
            setUserFollow({ id: data?.id, is_follow: false });
            setIsFollowed(false);
        } else {
            dispatch(displayFormLogin(true));
        }
    };
    useEffect(() => {
        if (userFollow.id === data?.id && userFollow.is_follow) {
            setIsFollowed(true);
        }
        if (userFollow.id === data?.id && !userFollow.is_follow) {
            setIsFollowed(false);
        }
    }, [userFollow]);

    const renderPreview = (props) => {
        return (
            <div className={cx("preview")} tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview
                        data={data}
                        isFollowed={isFollowed}
                        handleFollowUser={handleFollowUser}
                        handleUnFollowUser={handleUnFollowUser}
                    />
                </PopperWrapper>
            </div>
        );
    };

    // resize
    const handleResize = () => {
        setWidthScreen(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            {isLogin ? (
                <Link
                    to={`/@${data.nickname}`}
                    className={cx("wrapper-accountItem")}
                >
                    <Image
                        className={cx("avatar")}
                        src={data.avatar}
                        alt={data.nickname}
                    />

                    <div className={cx("box-name")}>
                        <span className={cx("username")}>
                            <strong>{data.nickname}</strong>
                            {data.tick && (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className={cx("icon-check")}
                                />
                            )}
                        </span>
                        <p
                            className={cx("name")}
                        >{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </Link>
            ) : (
                <Tippy
                    interactive
                    appendTo={document.body}
                    render={renderPreview}
                    delay={[800, 0]}
                    placement={widthScreen <= 1071 ? "left-start" : "bottom"}
                    offset={widthScreen <= 1071 ? [0, 12] : [-20, 0]}
                >
                    <Link
                        to={`/@${data.nickname}`}
                        className={cx("wrapper-accountItem")}
                    >
                        <Image
                            className={cx("avatar")}
                            src={data.avatar}
                            alt={data.nickname}
                        />

                        <div className={cx("box-name")}>
                            <span className={cx("username")}>
                                <strong>{data.nickname}</strong>
                                {data.tick && (
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className={cx("icon-check")}
                                    />
                                )}
                            </span>
                            <p
                                className={cx("name")}
                            >{`${data.first_name} ${data.last_name}`}</p>
                        </div>
                    </Link>
                </Tippy>
            )}
        </div>
    );
}

export default AccountItems;

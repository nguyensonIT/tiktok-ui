import styles from "./InfoProfile.module.scss";
import Image from "../../../../components/Image";
import Button from "../../../../components/Button";
import MenuShare from "../../../../components/MenuShare";
import PopperReport from "../../../../components/PopperReport";
import {
    EditIcon,
    ShareIcon,
    TickIcon,
    UserCheckIcon,
} from "../../../../components/Icons";

import { faEllipsis, faLink } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);
function InfoProfile({
    isFollowed,
    dataAnUser,
    handleUnFollowUser,
    handleFollowUser,
    isProfileYourself,
}) {
    const handleEditForm = () => {
        alert("hihi");
    };
    return (
        <div className={cx("wrapper-info")}>
            {/* avt user */}
            <div className={cx("user-info")}>
                <div className={cx("user-info-avatar")}>
                    <Image src={dataAnUser.avatar} alt={dataAnUser.nickname} />
                </div>
                <div className={cx("user-box-nickname")}>
                    <h1 className={cx("user-nickname")}>
                        {dataAnUser.nickname}
                    </h1>
                    {dataAnUser.tick && (
                        <span className={cx("user-icon-tick")}>
                            <TickIcon />
                        </span>
                    )}
                    <p className={cx("user-name")}>
                        {dataAnUser.first_name + " " + dataAnUser.last_name}
                    </p>
                    <div className={cx("user-box-follow")}>
                        {isProfileYourself ? (
                            <div className={cx("box-btn-edit")}>
                                <Button
                                    outline
                                    large
                                    className={cx("btn-edit")}
                                    onClick={handleEditForm}
                                    leftIcon={<EditIcon />}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        ) : isFollowed ? (
                            <div className={cx("box-message")}>
                                <div className={cx("btn-message")}>
                                    <Button
                                        outline
                                        className={cx("btn-message-btn")}
                                    >
                                        Messages
                                    </Button>
                                </div>
                                <div
                                    className={cx("btn-unfollow")}
                                    onClick={handleUnFollowUser}
                                >
                                    <UserCheckIcon />
                                </div>
                            </div>
                        ) : (
                            <div className={cx("box-btn-follow")}>
                                <Button
                                    primary
                                    large
                                    className={cx("btn-follow")}
                                    onClick={handleFollowUser}
                                >
                                    Follow
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Follow box  */}
            <div className={cx("user-follow-wrapper")}>
                <p className={cx("user-follow-text")}>
                    <strong>{dataAnUser.followings_count}</strong> Following
                </p>
                <p className={cx("user-follow-text")}>
                    <strong>{dataAnUser.followers_count}</strong> Followers
                </p>
                <p className={cx("user-follow-text")}>
                    <strong>{dataAnUser.likes_count}</strong> Likes
                </p>
            </div>
            {/* bio  */}
            {dataAnUser.bio && (
                <p className={cx("user-bio")}>{dataAnUser.bio}</p>
            )}
            {/* social  */}
            <div className={cx("user-social-wrapper")}>
                {dataAnUser.website_url && (
                    <div className={cx("wrapper-url")}>
                        <FontAwesomeIcon
                            icon={faLink}
                            className={cx("icon-url")}
                        />
                        <a
                            target="_blank"
                            href={dataAnUser.website_url}
                            className={cx("user-url")}
                        >
                            {dataAnUser.website_url}
                        </a>
                    </div>
                )}
                {dataAnUser.facebook_url && (
                    <div className={cx("wrapper-url")}>
                        <FontAwesomeIcon
                            icon={faLink}
                            className={cx("icon-url")}
                        />
                        <a
                            target="_blank"
                            href={dataAnUser.facebook_url}
                            className={cx("user-url")}
                        >
                            {dataAnUser.facebook_url}
                        </a>
                    </div>
                )}
                {dataAnUser.youtube_url && (
                    <div className={cx("wrapper-url")}>
                        <FontAwesomeIcon
                            icon={faLink}
                            className={cx("icon-url")}
                        />
                        <a
                            target="_blank"
                            href={dataAnUser.youtube_url}
                            className={cx("user-url")}
                        >
                            {dataAnUser.youtube_url}
                        </a>
                    </div>
                )}
                {dataAnUser.twitter_url && (
                    <div className={cx("wrapper-url")}>
                        <FontAwesomeIcon
                            icon={faLink}
                            className={cx("icon-url")}
                        />
                        <a
                            target="_blank"
                            href={dataAnUser.twitter_url}
                            className={cx("user-url")}
                        >
                            {dataAnUser.twitter_url}
                        </a>
                    </div>
                )}
                {dataAnUser.instagram_url && (
                    <div className={cx("wrapper-url")}>
                        <FontAwesomeIcon
                            icon={faLink}
                            className={cx("icon-url")}
                        />
                        <a
                            target="_blank"
                            href={dataAnUser.instagram_url}
                            className={cx("user-url")}
                        >
                            {dataAnUser.instagram_url}
                        </a>
                    </div>
                )}
            </div>
            {/* no bio, no social  */}
            {!dataAnUser.bio &&
                !dataAnUser.website_url &&
                !dataAnUser.facebook_url &&
                !dataAnUser.youtube_url &&
                !dataAnUser.twitter_url &&
                !dataAnUser.instagram_url && (
                    <div className={cx("biography-empty")}>
                        No biography yet.
                    </div>
                )}

            <div className={cx("box-button")}>
                <MenuShare offset={[-100, 0]}>
                    <div className={cx("btn-share")}>
                        <ShareIcon />
                    </div>
                </MenuShare>
                {isProfileYourself === false && (
                    <PopperReport>
                        <div className={cx("btn-dot")}>
                            <FontAwesomeIcon
                                icon={faEllipsis}
                                className={cx("dot-icon")}
                            />
                        </div>
                    </PopperReport>
                )}
            </div>
        </div>
    );
}

export default InfoProfile;

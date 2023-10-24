import styles from "./AccountPreview.module.scss";
import Button from "../../Button";
import Image from "../../Image";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function AccountPreview({
    data,
    isFollowed,
    isPreviewInVideo = false,
    handleUnFollowUser,
    handleFollowUser,
}) {
    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Image
                    className={cx("avatar")}
                    src={data.avatar}
                    alt={data.nickname}
                />
                {isFollowed ? (
                    <Button
                        onClick={() => handleUnFollowUser()}
                        outline
                        className={cx("btn-following")}
                    >
                        Following
                    </Button>
                ) : (
                    <Button
                        onClick={() => handleFollowUser()}
                        primary
                        className={cx("btn-follow")}
                    >
                        Follow
                    </Button>
                )}
            </header>
            <div className={cx("info-preview")}>
                <strong className={cx("nickname")}>{data.nickname}</strong>
                <span>
                    {data.tick && (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={cx("check-icon")}
                        />
                    )}
                </span>
                <h4
                    className={cx("name")}
                >{`${data.first_name} ${data.last_name}`}</h4>
                <p className={cx("footer")}>
                    <strong className={cx("number")}>
                        {data.followers_count}{" "}
                    </strong>
                    <span className={cx("text-footer")}>Follower</span>
                    <strong className={cx("number")}>
                        {data.likes_count}{" "}
                    </strong>
                    <span className={cx("text-footer")}>Likes</span>
                </p>
            </div>
            {isPreviewInVideo && (
                <div className={cx("content-bio")}>
                    <p className={cx("content-bio-text")}>{data.bio}</p>
                </div>
            )}
        </div>
    );
}

export default AccountPreview;

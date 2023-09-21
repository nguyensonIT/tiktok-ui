import classNames from "classnames/bind";
import styles from "./AccountPreview.module.scss";
import Button from "../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "../../Image";
import { fetchFollowUser } from "../../../services/followingAccountsService";

const cx = classNames.bind(styles);
function AccountPreview({ data = [], isPreviewInVideo = false }) {
  const handleFollow = async () => {
    const resp = await fetchFollowUser(data?.id);
    console.log({ resp });
  };
  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <Image className={cx("avatar")} src={data.avatar} alt={data.nickname} />
        <div>
          <Button onClick={handleFollow} primary className={cx("btn-follow")}>
            Follow
          </Button>
        </div>
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
        <h4 className={cx("name")}>{`${data.first_name} ${data.last_name}`}</h4>
        <p className={cx("footer")}>
          <strong className={cx("number")}>{data.followers_count} </strong>
          <span className={cx("text-footer")}>Follower</span>
          <strong className={cx("number")}>{data.likes_count} </strong>
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

import LikedPrivate from "./LikedPrivate";
import styles from "./LikedTab.module.scss";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function LikedTab({ isLikedVideoForMe }) {
    return isLikedVideoForMe ? <div>Video Liked For Me</div> : <LikedPrivate />;
}

export default LikedTab;

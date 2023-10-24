import { LockIcon } from "../../../../../components/Icons";
import styles from "../LikedTab.module.scss";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function LikedPrivate() {
    return (
        <div className={cx("wrapper-liked-private")}>
            <div className={cx("liked-private-box-icon")}>
                <LockIcon className={cx("liked-private-icon")} />
            </div>
            <p className={cx("liked-private-title")}>
                This user's liked videos are private
            </p>
            <p className={cx("liked-private-desc")}>
                Videos liked by hoaa.hanassii are currently hidden
            </p>
        </div>
    );
}

export default LikedPrivate;

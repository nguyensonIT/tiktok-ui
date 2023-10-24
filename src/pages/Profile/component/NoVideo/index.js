import classNames from "classnames/bind";

import styles from "./NoVideo.module.scss";
import { UserIcon } from "../../../../components/Icons";

const cx = classNames.bind(styles);
function NoVideo({
    title = "No content",
    desc = "This user has not published any videos.",
}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <UserIcon className={cx("icon-user")} />
                <p className={cx("title")}>{title}</p>
                <p className={cx("desc")}>{desc}</p>
            </div>
        </div>
    );
}

export default NoVideo;

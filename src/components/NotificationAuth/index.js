import classNames from "classnames/bind";
import styles from "./NotificationAuth.module.scss";

const cx = classNames.bind(styles);
function NotificationAuth({ title, style }) {
    return (
        <div style={style} className={cx("wrapper")}>
            <p className={cx("title")}>{title}</p>
        </div>
    );
}

export default NotificationAuth;

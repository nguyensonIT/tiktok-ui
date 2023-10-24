import classNames from "classnames/bind";
import styles from "./NotificationAuth.module.scss";

import ReactDOM from "react-dom";

const cx = classNames.bind(styles);
function NotificationAuth({ title }) {
    return ReactDOM.createPortal(
        <div className={cx("wrapper")}>
            <p className={cx("title")}>{title}</p>
        </div>,
        document.querySelector("body")
    );
}

export default NotificationAuth;

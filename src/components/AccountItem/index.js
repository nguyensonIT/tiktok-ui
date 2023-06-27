import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx("wrapper")}>
            <img
                className={cx("avatar")}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/580ca6be0aa9539234f1b88f065053f2~c5_100x100.jpeg?x-expires=1687600800&x-signature=GWm3xXmQb3dfB4EC76axEDcKwDw%3D"
                alt="Hoaa"
            />
            <div className={cx("info")}>
                <p className={cx("name")}>
                    <span>Nguyễn Văn A</span>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </p>
                <span className={cx("username")}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;

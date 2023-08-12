import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "../Image";

const cx = classNames.bind(styles);

function AccountItem({ acc }) {
    console.log(acc);
    return (
        <Link to={`/@${acc.nickname}`} className={cx("wrapper")}>
            <Image
                className={cx("avatar")}
                src={acc.avatar}
                alt={acc.nickname}
            />
            <div className={cx("info")}>
                <p className={cx("name")}>
                    <span>{acc.full_name}</span>
                    {acc.tick && (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={cx("icon-check")}
                        />
                    )}
                </p>
                <span className={cx("username")}>{acc.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountItem;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Button";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <header className={cx("header")}>
            <Button className={cx("back-btn")} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <h4 className={cx("header-title")}>{title}</h4>
        </header>
    );
}

export default Header;

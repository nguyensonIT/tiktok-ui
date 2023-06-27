import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import image from "../../../assets/images";

import Tippy from "@tippyjs/react/headless";
import { wrapper as PopperWrapper } from "../../../Popper";

import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import AccountItem from "../../../AccountItem";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: "English",
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
    },
    {
        title: "Feedback and help",
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        to: "/feedback",
    },
    {
        title: "Keyboard Shortcut",
        icon: <FontAwesomeIcon icon={faKeyboard} />,
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    }, []);
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <img src={image.logo} alt="logo" />
                </div>
                <Tippy
                    interactive
                    visible={searchResult.length > 4}
                    render={(attrs) => (
                        <div
                            className={cx("search-result")}
                            tabIndex="-1"
                            {...attrs}
                        >
                            <PopperWrapper>
                                <h4 className={cx("search-title")}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx("search")}>
                        <input
                            placeholder="Search accounts and videos"
                            spellCheck={false}
                        />
                        <button className={cx("clear")}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon
                            className={cx("loading")}
                            icon={faSpinner}
                        />
                        <button className={cx("search-btn")}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx("actions")}>
                    <Button text>Upload</Button>
                    <Button primary>Log in</Button>

                    <Menu items={MENU_ITEMS}>
                        <button className={cx("more-btn")}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

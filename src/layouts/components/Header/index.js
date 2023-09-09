import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import image from "../../../assets/images";
import "tippy.js/dist/tippy.css";

import Tippy from "@tippyjs/react";

import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faBookBookmark,
    faCoins,
    faGear,
    faRightToBracket,
    faMoon,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import routerConfig from "../../../config/routes";
import Button from "../../../components/Button";
import Menu from "../../../components/Popper/Menu";
import DarkModeBtn from "../../../components/Button/DarkModeBtn";
import Image from "../../../components/Image";
import Search from "./Search";
import { Link } from "react-router-dom";
import { MessageIconSolid, SendIconSolid } from "../../../components/Icons";
import Login from "../../../components/Login";
import * as loginService from "../../../services/loginService";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: "English",
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        children: {
            title: "Language",
            data: [
                {
                    type: "language",
                    code: "en",
                    title: "English",
                },
                {
                    type: "language",
                    code: "vi",
                    title: "Tiếng Việt",
                },
            ],
        },
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
    {
        title: "Dark mode",
        icon: <FontAwesomeIcon icon={faMoon} />,
        dark_mode: <DarkModeBtn />,
    },
];

const userMenu = [
    {
        title: "View Profile",
        icon: <FontAwesomeIcon icon={faUser} />,
        to: "/profile",
    },
    {
        title: "Favorites",
        icon: <FontAwesomeIcon icon={faBookBookmark} />,
        to: "/favorites",
    },
    {
        title: "Get Coins",
        icon: <FontAwesomeIcon icon={faCoins} />,
        to: "/getcoins",
    },
    {
        title: "Settings",
        icon: <FontAwesomeIcon icon={faGear} />,
        to: "/settings",
    },
    ...MENU_ITEMS,

    {
        title: "Log out",
        icon: <FontAwesomeIcon icon={faRightToBracket} />,
        to: "/logout",
        separate: true,
    },
];

function Header() {
    const token = localStorage.getItem("token");
    const [isFormLogin, setIsFormLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case "language":
                break;
            default:
        }
    };

    const handleLogin = () => {
        setIsFormLogin(true);
    };
    useEffect(() => {
        const getCurrentUser = async () => {
            loginService
                .currentUser(token)
                .then((res) => setCurrentUser(res))
                .catch((err) => console.log(err));
        };
        token && getCurrentUser();
    }, [token]);
    console.log(currentUser);
    return (
        <header className={cx("wrapper")}>
            {isFormLogin && <Login setIsFormLogin={setIsFormLogin} />}
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <Link to={routerConfig.home}>
                        <img src={image.logo} alt="logo" />
                    </Link>
                </div>
                <Search />
                <div className={cx("actions")}>
                    {currentUser ? (
                        <>
                            <Button
                                outline
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={cx("plus-icon")}
                                    />
                                }
                                className={cx("btn-upload")}
                            >
                                Upload
                            </Button>
                            <div>
                                <Tippy content="Messages" placement="bottom">
                                    <div className={cx("box-messages")}>
                                        <SendIconSolid />
                                        <span className={cx("box-qnt")}>
                                            20
                                        </span>
                                    </div>
                                </Tippy>
                            </div>
                            <div>
                                <Tippy content="Inbox" placement="bottom">
                                    <div className={cx("box-notifications")}>
                                        <MessageIconSolid />
                                        <span className={cx("box-qnt")}>
                                            20
                                        </span>
                                    </div>
                                </Tippy>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                outline
                                leftIcon={
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className={cx("plus-icon")}
                                    />
                                }
                                className={cx("btn-upload")}
                            >
                                Upload
                            </Button>
                            <Button primary onClick={handleLogin}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu
                        items={!!currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                src={currentUser.avatar}
                                className={cx("user-avatar")}
                                alt="img"
                            />
                        ) : (
                            <button className={cx("more-btn")}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

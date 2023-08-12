import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import image from "../../../../assets/images";
import "tippy.js/dist/tippy.css";

import Tippy from "@tippyjs/react";

import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCloudArrowUp,
    faUser,
    faBookBookmark,
    faCoins,
    faGear,
    faRightToBracket,
    faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";
import Button from "../../../Button";
import Menu from "../../../Popper/Menu";
import DarkModeBtn from "../../../Button/DarkModeBtn";
import Image from "../../../Image";
import Search from "./Search";

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
        title: "Dark mode",
        icon: <FontAwesomeIcon icon={faMoon} />,
        dark_mode: <DarkModeBtn />,
    },
    {
        title: "Log out",
        icon: <FontAwesomeIcon icon={faRightToBracket} />,
        to: "/logout",
        separate: true,
    },
];

function Header() {
    const currentUser = true;
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case "language":
                break;
            default:
        }
    };

    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <img src={image.logo} alt="logo" />
                </div>
                <Search />
                <div className={cx("actions")}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video" placement="bottom">
                                <button className={cx("action-btn")}>
                                    <FontAwesomeIcon icon={faCloudArrowUp} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (
                            <Image
                                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42a81079b5885e152707b170d63ba2df~c5_100x100.jpeg?x-expires=1691719200&x-signature=rQCRIIsEbD8lStyqCnkJp5%2BNR14%3D"
                                className={cx("user-avatar")}
                                alt="img"
                                fallback="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4d0846d02dc115c3ebe6603cbb4e07d3~c5_100x100.jpeg?x-expires=1691895600&x-signature=3b6mxbgfgYQ4Sc1i2NTgWm8To6o%3D"
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

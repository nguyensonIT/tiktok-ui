import DarkModeBtn from "../../../../components/Button/DarkModeBtn";

import {
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faBookBookmark,
    faCoins,
    faGear,
    faRightToBracket,
    faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MENU_ITEMS = [
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
        to: "#",
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

export const userMenu = [
    {
        title: "View Profile",
        icon: <FontAwesomeIcon icon={faUser} />,
        to: "/nickname",
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
        type: "logout",
        title: "Log out",
        icon: <FontAwesomeIcon icon={faRightToBracket} />,
        separate: true,
    },
];

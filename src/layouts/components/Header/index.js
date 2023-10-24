import styles from "./Header.module.scss";
import image from "../../../assets/images";
import routerConfig from "../../../config/routes";
import Button from "../../../components/Button";
import Menu from "../../../components/Popper/Menu";
import Image from "../../../components/Image";
import Search from "./Search";
import { MessageIconSolid, SendIconSolid } from "../../../components/Icons";
import Login from "../../../components/Login";
import * as loginService from "../../../services/loginService";
import {
    changeDataUser,
    changeNotificationLogout,
    displayFormLogin,
} from "../../../redux/actions";
import { MENU_ITEMS, userMenu } from "./ItemMenu";

import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
    const token = localStorage.getItem("token");

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case "language":
                break;
            case "logout":
                handleLogout();
                break;
            default:
        }
    };

    const currentUser = useSelector((state) => state.dataUser);
    const dispatch = useDispatch();

    const handleLogin = () => {
        dispatch(displayFormLogin(true));
    };
    const handleLogout = () => {
        dispatch(changeNotificationLogout(true));
        localStorage.removeItem("token");
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    useEffect(() => {
        const getCurrentUser = () => {
            loginService
                .currentUser(token)
                .then((res) => dispatch(changeDataUser(res)))
                .catch((err) => console.log(err));
        };
        token && getCurrentUser();
    }, [token]);
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <Link to={routerConfig.home}>
                        <img src={image.logo} alt="logo" />
                    </Link>
                </div>
                <Search />
                <div className={cx("actions")}>
                    {!!Object.keys(currentUser).length ? (
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
                        items={token ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}
                    >
                        {!!Object.keys(currentUser).length ? (
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

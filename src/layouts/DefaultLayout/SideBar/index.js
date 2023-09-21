import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import {
    HomeIcon,
    HomeIconActive,
    LiveIcon,
    LiveIconActive,
    UserGroupIcon,
    UserGroupIconActive,
} from "../../../components/Icons";
import styles from "./SideBar.module.scss";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItems";
import config from "../../../config";
import AccountsSideBar from "../../../components/AccountsSideBar/AccountsSideBar";
import * as suggestedAccountsServive from "../../../services/suggestedAccountsServive";
import * as followingAccountsService from "../../../services/followingAccountsService";
import FooterSideBar from "./FooterSideBar";
import LoginSideBar from "./AuthSideBar/LoginSideBar";
const cx = classNames.bind(styles);

function SideBar() {
    const INIT_PERPAGE = 5;

    const [suggestedUser, setSuggestedUser] = useState([]);
    const [followingUser, setFollowingUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [perPageSuggested, setPerPageSuggested] = useState(INIT_PERPAGE);
    const [isShowLessAccountRegisted, setIsShowLessAccountRegisted] =
        useState(true);

    const isLogin = localStorage.getItem("token");

    useEffect(() => {
        suggestedAccountsServive
            .suggested(1, perPageSuggested)
            .then((data) => setSuggestedUser(data))
            .catch((err) => console.log(err));
    }, [perPageSuggested]);
    const handleChangeShowAccountRegisted = () => {
        setIsShowLessAccountRegisted(!isShowLessAccountRegisted);
        setPerPageSuggested(() =>
            !isShowLessAccountRegisted ? INIT_PERPAGE : INIT_PERPAGE + 15
        );
    };
    const handleChangeShowAccountFollowing = () => {
        setCurrentPage((prev) => {
            if (currentPage < totalPage) {
                return prev + 1;
            } else return 1;
        });
    };
    useEffect(() => {
        const getFollowingAccount = async () => {
            try {
                const res = await followingAccountsService.following(
                    isLogin,
                    currentPage
                );
                setFollowingUser((prev) => {
                    if (currentPage === 1) {
                        return res.data;
                    }
                    return [...prev, ...res.data];
                });
                setTotalPage(res.meta.pagination.total_pages);
            } catch (error) {
                console.log(error);
            }
        };
        isLogin && getFollowingAccount();
    }, [currentPage]);
    return (
        <aside className={cx("wrapper")}>
            <div className={cx("container")}>
                <Menu>
                    <MenuItem
                        title="For you"
                        to={config.routes.home}
                        icon={<HomeIcon />}
                        activeIcon={<HomeIconActive />}
                    />
                    <MenuItem
                        title="Following"
                        to={config.routes.following}
                        icon={<UserGroupIcon />}
                        activeIcon={<UserGroupIconActive />}
                    />
                    <MenuItem
                        title="Live"
                        to={config.routes.live}
                        icon={<LiveIcon />}
                        activeIcon={<LiveIconActive />}
                    />
                </Menu>
                <hr className={cx("line")} />
                <AccountsSideBar
                    title="Suggested accounts"
                    data={suggestedUser}
                    onChangeShow={handleChangeShowAccountRegisted}
                    isShowLess={isShowLessAccountRegisted}
                />
                <hr className={cx("line")} />
                {!isLogin && <LoginSideBar />}
                <hr className={cx("line")} />
                {isLogin && (
                    <AccountsSideBar
                        titleDefault="The accounts you follow will appear here"
                        title="Following accounts"
                        data={followingUser}
                        onChangeShow={handleChangeShowAccountFollowing}
                        isShowLess={currentPage !== totalPage}
                    />
                )}
                <hr className={cx("line")} />
                <FooterSideBar />
            </div>
        </aside>
    );
}

export default SideBar;

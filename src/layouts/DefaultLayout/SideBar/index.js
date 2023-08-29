import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItems";
import config from "../../../config";
import {
    HomeIcon,
    HomeIconActive,
    LiveIcon,
    LiveIconActive,
    UserGroupIcon,
    UserGroupIconActive,
} from "../../../components/Icons";
import SuggestedAccounteds from "../../../components/SuggestedAccounteds/SuggestedAccounteds";
import { useEffect, useState } from "react";
import * as suggestedAccountsServive from "../../../services/suggestedAccountsServive";
import FooterSideBar from "./FooterSideBar";
const cx = classNames.bind(styles);

function SideBar() {
    const INIT_PERPAGE = 5;

    const [suggestedUser, setSuggestedUser] = useState([]);
    const [perPageSuggested, setPerPageSuggested] = useState(INIT_PERPAGE);
    const [isShowLess, setIsShowLess] = useState(true);

    useEffect(() => {
        suggestedAccountsServive
            .suggested(1, perPageSuggested)
            .then((data) => setSuggestedUser(data))
            .catch((err) => console.log(err));
    }, [perPageSuggested]);
    const handleChangeShow = () => {
        setIsShowLess(!isShowLess);
        setPerPageSuggested(() =>
            !isShowLess ? INIT_PERPAGE : INIT_PERPAGE + 15
        );
    };
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
                <SuggestedAccounteds
                    title="Suggested accounts"
                    data={suggestedUser}
                    onChangeShow={handleChangeShow}
                    isShowLess={isShowLess}
                />
                <hr className={cx("line")} />
                {/* <SuggestedAccounteds
                    title="Following accounts"
                    data={suggestedUser}
                /> */}
                <FooterSideBar />
            </div>
        </aside>
    );
}

export default SideBar;

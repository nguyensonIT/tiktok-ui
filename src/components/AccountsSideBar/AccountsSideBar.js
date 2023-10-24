import classNames from "classnames/bind";
import styles from "./AccountsSideBar.module.scss";
import AccountItems from "./AccountItems";
const cx = classNames.bind(styles);
function AccountsSideBar({
    titleDefault,
    title,
    data = [],
    onChangeShow,
    isShowLess,
    isLogin,
}) {
    return (
        <div className={cx("wrapper-suggested")}>
            <p className={cx("title")}>{title}</p>
            {data.length === 0 && (
                <p className={cx("title-default")}>{titleDefault}</p>
            )}
            <div className={cx("content-account")}>
                {data.map((user) => (
                    <AccountItems key={user.id} data={user} isLogin={isLogin} />
                ))}
            </div>
            {data.length >= 1 && (
                <span className={cx("seemore")} onClick={onChangeShow}>
                    {isShowLess ? "See more" : "Show less"}
                </span>
            )}
        </div>
    );
}

export default AccountsSideBar;

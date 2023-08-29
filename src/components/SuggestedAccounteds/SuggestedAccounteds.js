import classNames from "classnames/bind";
import styles from "./SuggestedAccounteds.module.scss";
import AccountItems from "./AccountItems";
const cx = classNames.bind(styles);
function SuggestedAccounteds({ title, data = [], onChangeShow, isShowLess }) {
    return (
        <div className={cx("wrapper-suggested")}>
            <p className={cx("title")}>{title}</p>
            <div className={cx("content-account")}>
                {data.map((user) => (
                    <AccountItems key={user.id} data={user} />
                ))}
            </div>
            <span className={cx("seemore")} onClick={onChangeShow}>
                {isShowLess ? "See more" : "Show less"}
            </span>
        </div>
    );
}

export default SuggestedAccounteds;

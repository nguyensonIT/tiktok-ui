import classNames from "classnames/bind";
import styles from "./SuggestedAccounteds.module.scss";
import AccountItems from "./AccountItems";
const cx = classNames.bind(styles);
function SuggestedAccounteds({ title, data = [] }) {
    console.log(data);
    return (
        <div className={cx("wrapper-suggested")}>
            <p className={cx("title")}>{title}</p>
            <div className={cx("content-account")}>
                {data.map((user) => (
                    <AccountItems key={user.id} data={user} />
                ))}
            </div>
            <p className={cx("seemore")}>See more</p>
        </div>
    );
}

export default SuggestedAccounteds;

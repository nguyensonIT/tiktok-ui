import classNames from "classnames/bind";
import styles from "./MenuShare.module.scss";

const cx = classNames.bind(styles);
function MenuItem({ data = [] }) {
    return (
        <>
            <a href={data.href} className={cx("body-menuItem")}>
                {data.icon}
                <span className={cx("text-link")}>{data.title}</span>
            </a>
        </>
    );
}

export default MenuItem;

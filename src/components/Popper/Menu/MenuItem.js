import Button from "../../Button";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const classess = cx("menu-item", {
        separate: data.separate,
    });
    return (
        <Button
            className={classess}
            leftIcon={data.icon}
            to={data.to}
            onClick={onClick}
            rightIcon={data.dark_mode}
        >
            {data.title}
        </Button>
    );
}

export default MenuItem;

import Button from "../../Button";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const nicknameYourself = useSelector((state) => state.dataUser.nickname);

    const classess = cx("menu-item", {
        separate: data.separate,
    });
    if (nicknameYourself) {
        if (data.to === "/nickname") {
            data.to = `/@${nicknameYourself}`;
        }
    }

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

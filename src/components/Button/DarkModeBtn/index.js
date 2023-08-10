import classNames from "classnames/bind";
import styles from "./DarkMode.module.scss";
import { useState } from "react";
const cx = classNames.bind(styles);
function DarkModeBtn() {
    const [isActive, setIsActive] = useState(false);
    const handleDarkMode = () => {
        setIsActive(!isActive);
    };
    return (
        <div
            className={cx("dark_mode", { active: isActive })}
            onClick={handleDarkMode}
        >
            <span className={cx("ball", { active: isActive })}></span>
        </div>
    );
}

export default DarkModeBtn;

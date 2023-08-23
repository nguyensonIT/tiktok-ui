import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
function MenuItem({ icon, title, to, activeIcon }) {
    return (
        <NavLink
            className={(nav) => cx("menu-item", { active: nav.isActive })}
            to={to}
        >
            <span className={cx("icon")}>{icon}</span>
            <span className={cx("active-icon")}>{activeIcon}</span>
            <span className={cx("title")}>{title}</span>
        </NavLink>
    );
}
MenuItem.prototype = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;

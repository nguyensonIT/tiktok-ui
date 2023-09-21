import classNames from "classnames/bind";
import styles from "./LoginSideBar.module.scss";
import Button from "../../../../../components/Button";
import { useDispatch } from "react-redux";
import { displayFormLogin } from "../../../../../redux/actions";

const cx = classNames.bind(styles);
function LoginSideBar() {
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(displayFormLogin(true));
    };
    return (
        <div className={cx("wrapper")}>
            <p className={cx("title")}>
                Log in to follow creators, like videos, and view comments.
            </p>
            <div className={cx("login-box")}>
                <Button
                    onClick={handleLogin}
                    large
                    outline
                    className={cx("login-btn")}
                >
                    Log in
                </Button>
            </div>
        </div>
    );
}

export default LoginSideBar;

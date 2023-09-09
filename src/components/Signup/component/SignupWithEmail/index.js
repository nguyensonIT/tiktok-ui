import classNames from "classnames/bind";
import styles from "./SignupWithEmail.module.scss";
import Button from "../../../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { EyeIcon, EyeSlashIcon } from "../../../Icons";
import { useState } from "react";

const cx = classNames.bind(styles);
function SignupWithEmail() {
    const [isEyePassword, setIsEyePassword] = useState(false);
    const [isEyeCofirmPassword, setIsEyeCofirmPassword] = useState(false);
    const handleChangeEyePassword = () => {
        setIsEyePassword(!isEyePassword);
    };
    const handleChangeEyeCofirmPassword = () => {
        setIsEyeCofirmPassword(!isEyeCofirmPassword);
    };
    return (
        <div className={cx("wrapper")}>
            <form className={cx("form-signup")}>
                <label className={cx("lable-signup")}>Email</label>
                <div className={cx("inp-signup")}>
                    <input type="text" placeholder="Email Address" />
                </div>
                <div className={cx("inp-signup")}>
                    <input
                        type={isEyePassword ? "text" : "password"}
                        placeholder="Password"
                    />
                    <div
                        className={cx("icon-eye")}
                        onClick={handleChangeEyePassword}
                    >
                        {isEyePassword ? <EyeIcon /> : <EyeSlashIcon />}
                    </div>
                </div>
                <div className={cx("inp-signup")}>
                    <input
                        type={isEyeCofirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                    />
                    <div
                        className={cx("icon-eye")}
                        onClick={handleChangeEyeCofirmPassword}
                    >
                        {isEyeCofirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                    </div>
                </div>
                <div className={cx("inp-checkbox")}>
                    <input id="check" type="checkbox" />
                    <label className={cx("label-check")} htmlFor="check">
                        <FontAwesomeIcon icon={faCheck} />
                    </label>
                    <p className={cx("checkbox-desc")}>
                        Get trending content, newsletters, promotions, offers,
                        and account updates delivered to your email
                    </p>
                </div>
            </form>
            <Button
                className={cx("btn-signup")}
                disabled={true}
                large
                primary
                type="button"
            >
                Sign up
            </Button>
        </div>
    );
}

export default SignupWithEmail;

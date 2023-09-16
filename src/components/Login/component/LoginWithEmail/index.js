import classNames from "classnames/bind";
import { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./LoginWithEmail.module.scss";
import Button from "../../../Button";
import { EyeIcon, EyeSlashIcon } from "../../../Icons";
import * as loginService from "../../../../services/loginService";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { changeTypeNotificationAuth } from "../../../../redux/actions";

const cx = classNames.bind(styles);
function LoginWithEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEyePassword, setIsEyePassword] = useState(false);
    const [errLabel, setErrLabel] = useState("");
    const dispatch = useDispatch();
    const handleChangeEyePassword = () => {
        setIsEyePassword(!isEyePassword);
    };
    const { register, handleSubmit, watch } = useForm();

    const handleLogin = async (data) => {
        setIsLoading(true);
        try {
            const res = await loginService.login(data.username, data.password);
            const dataToken = res.meta.token;
            localStorage.setItem("token", dataToken);
            dispatch(
                changeTypeNotificationAuth({
                    style: "translateY(0px)",
                    title: "Success login",
                })
            );
            setErrLabel("");
            window.location.reload();
        } catch (error) {
            if ((error.response.data.status_code = 401)) {
                setErrLabel("Email or password information is incorrect!");
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cx("wrapper")}>
            <form
                className={cx("form-login")}
                onSubmit={handleSubmit(handleLogin)}
            >
                <label className={cx("lable-login")}>Email or Username</label>
                <div className={cx("inp-login")}>
                    <input
                        type="text"
                        placeholder="Email or Username"
                        {...register("username")}
                    />
                </div>
                <div className={cx("inp-login")}>
                    <input
                        type={isEyePassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password")}
                    />
                    <div
                        className={cx("icon-eye")}
                        onClick={handleChangeEyePassword}
                    >
                        {isEyePassword ? <EyeIcon /> : <EyeSlashIcon />}
                    </div>
                </div>
                <label className={cx("err-label")}>{errLabel}</label>
                <div>
                    <a href="#" className={cx("forgot-link")}>
                        Forgot password?
                    </a>
                </div>
                <Button
                    className={cx("btn-login")}
                    disabled={
                        isLoading ||
                        watch("username") === "" ||
                        watch("password") === ""
                    }
                    large
                    primary
                    type="submit"
                >
                    {isLoading ? (
                        <FontAwesomeIcon
                            className={cx("loading")}
                            icon={faSpinner}
                        />
                    ) : (
                        "Log in"
                    )}
                </Button>
            </form>
        </div>
    );
}

export default LoginWithEmail;

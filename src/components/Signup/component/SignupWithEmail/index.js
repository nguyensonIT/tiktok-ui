import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import {
    faCheck,
    faSpinner,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as registerService from "../../../../services/registerService";
import { EyeIcon, EyeSlashIcon } from "../../../Icons";
import styles from "./SignupWithEmail.module.scss";
import Button from "../../../Button";
import { useDispatch } from "react-redux";
import {
    changeNotificationRegistered,
    changeNotificationSignup,
} from "../../../../redux/actions";

const cx = classNames.bind(styles);
function SignupWithEmail() {
    const [isLoading, setIsLoading] = useState(false);
    const [isEyePassword, setIsEyePassword] = useState(false);
    const [isEyeCofirmPassword, setIsEyeCofirmPassword] = useState(false);
    const [errorRegistered, setErrorRegistered] = useState("");

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const handleChangeEyePassword = () => {
        setIsEyePassword(!isEyePassword);
    };
    const handleChangeEyeCofirmPassword = () => {
        setIsEyeCofirmPassword(!isEyeCofirmPassword);
    };
    const handleSignup = async (data) => {
        setIsLoading(true);
        try {
            const res = await registerService.register(
                "email",
                data.email,
                data.password
            );
            dispatch(changeNotificationSignup(true));
            const dataToken = res.meta.token;
            localStorage.setItem("token", dataToken);
            setTimeout(() => {
                window.location.reload();
            }, 1800);
        } catch (error) {
            dispatch(changeNotificationRegistered(true));
            setErrorRegistered("Account has been registered");
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                dispatch(changeNotificationSignup(false));
                dispatch(changeNotificationRegistered(false));
            }, 1800);
        }
    };
    const password = watch("password");
    return (
        <div className={cx("wrapper")}>
            <form
                className={cx("form-signup")}
                onSubmit={handleSubmit(handleSignup)}
            >
                <label className={cx("lable-signup")}>
                    Email or Phone Number
                </label>
                <div className={cx("inp-signup")}>
                    <input
                        type="text"
                        placeholder="Email Address or Phone Number"
                        {...register("email", {
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email invalid!",
                            },
                        })}
                    />
                </div>
                <div className={cx("inp-signup")}>
                    <input
                        type={isEyePassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "At least 1 uppercase character, 1 lowercase character, 1 number and 1 special character",
                            },
                        })}
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
                        {...register("confirmpassword", {
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                    />
                    <div
                        className={cx("icon-eye")}
                        onClick={handleChangeEyeCofirmPassword}
                    >
                        {isEyeCofirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
                    </div>
                </div>
                <div className={cx("box-error")}>
                    {errorRegistered !== "" && (
                        <div className={cx("wrapper-error")}>
                            <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                className={cx("icon-error")}
                            />
                            <label className={cx("label-error")}>
                                {errorRegistered}
                            </label>
                        </div>
                    )}
                    {errors?.email?.message && (
                        <div className={cx("wrapper-error")}>
                            <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                className={cx("icon-error")}
                            />
                            <label className={cx("label-error")}>
                                {errors?.email?.message}
                            </label>
                        </div>
                    )}
                    {errors?.password?.message && (
                        <div className={cx("wrapper-error")}>
                            <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                className={cx("icon-error")}
                            />
                            <label className={cx("label-error")}>
                                {errors?.password?.message}
                            </label>
                        </div>
                    )}
                    {errors?.confirmpassword?.message && (
                        <div className={cx("wrapper-error")}>
                            <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                className={cx("icon-error")}
                            />
                            <label className={cx("label-error")}>
                                {errors?.confirmpassword?.message}
                            </label>
                        </div>
                    )}
                </div>
                <div className={cx("inp-checkbox")}>
                    <input
                        id="check"
                        type="checkbox"
                        {...register("checkbox", {
                            required: "Agree to the terms",
                        })}
                    />
                    <label className={cx("label-check")} htmlFor="check">
                        <FontAwesomeIcon icon={faCheck} />
                    </label>
                    <p className={cx("checkbox-desc")}>
                        Get trending content, newsletters, promotions, offers,
                        and account updates delivered to your email
                    </p>
                </div>
                <Button
                    className={cx("btn-signup")}
                    large
                    primary
                    disabled={
                        isLoading ||
                        watch("email") === "" ||
                        watch("password") === "" ||
                        watch("confirmpassword") === "" ||
                        !watch("checkbox")
                    }
                >
                    {isLoading ? (
                        <FontAwesomeIcon
                            className={cx("loading")}
                            icon={faSpinner}
                        />
                    ) : (
                        "Sign up"
                    )}
                </Button>
            </form>
        </div>
    );
}

export default SignupWithEmail;

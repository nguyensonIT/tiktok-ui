import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronLeft,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import {
    AppleIcon,
    FaceBookIcon,
    GoogleIcon,
    InstagramIcon,
    KakaoTalkIcon,
    LineIcon,
    QRIcon,
    TwisterIcon,
    UserIcon,
} from "../Icons";
import QRcode from "./component/QRcode";
import LoginWithEmail from "./component/LoginWithEmail";
import SignupWithEmail from "../Signup/component/SignupWithEmail";
import { useDispatch } from "react-redux";
import { displayFormLogin } from "../../redux/actions";

const cx = classNames.bind(styles);
const dataForm = [
    {
        footer_des: "Don’t have an account?",
        footer_link: "Sign up",
        title: "Log in to TikTok",
        data: [
            {
                icon: <QRIcon />,
                name: "Use QR code",
                detail: {
                    footer_des: "Don’t have an account?",
                    footer_link: "Sign up",
                    title: "Log in to QR",
                    data: <QRcode />,
                },
            },
            {
                icon: <UserIcon />,
                name: "Use phone / email / username",
                detail: {
                    footer_des: "Don’t have an account?",
                    footer_link: "Sign up",
                    title: "Login",
                    data: <LoginWithEmail />,
                },
            },
            {
                icon: <FaceBookIcon />,
                name: "Continue with Facebook",
                disable: true,
            },
            {
                icon: <GoogleIcon />,
                name: "Continue with Google",
                disable: true,
            },
            {
                icon: <TwisterIcon />,
                name: "Continue with Twitter",
                disable: true,
            },
            {
                icon: <LineIcon />,
                name: "Continue with LINE",
                disable: true,
            },
            {
                icon: <KakaoTalkIcon />,
                name: "Continue with KakaoTalk",
                disable: true,
            },
            {
                icon: <AppleIcon />,
                name: "Continue with Apple",
                disable: true,
            },
            {
                icon: <InstagramIcon />,
                name: "Continue with Instagram",
                disable: true,
            },
        ],
    },
    {
        footer_des: "Already have an account?",
        footer_link: "Login",
        title: "Sign up for TikTok",
        data: [
            {
                icon: <UserIcon />,
                name: "Use phone or email",
                detail: {
                    footer_des: "Already have an account?",
                    footer_link: "Login",
                    title: "Sign up",
                    data: <SignupWithEmail />,
                },
            },
            {
                icon: <FaceBookIcon />,
                name: "Continue with Facebook",
                disable: true,
            },
            {
                icon: <GoogleIcon />,
                name: "Continue with Google",
                disable: true,
            },
        ],
        dataMore: [
            {
                icon: <TwisterIcon />,
                name: "Continue with Twitter",
                disable: true,
            },
            {
                icon: <LineIcon />,
                name: "Continue with LINE",
                disable: true,
            },
            {
                icon: <KakaoTalkIcon />,
                name: "Continue with KakaoTalk",
                disable: true,
            },
        ],
        isSignUp: true,
        iconMore: <FontAwesomeIcon icon={faChevronDown} />,
    },
];
function Login() {
    const refMore = useRef();
    const [dataDialog, setDataDialog] = useState([dataForm[0]]);
    const [dataItemSignUp, setDataItemSignUp] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();
    const handleCloseDialog = () => {
        dispatch(displayFormLogin(false));
    };
    const handlePrevDialog = () => {
        setDataDialog((prev) => {
            return prev.slice(0, 1);
        });
    };
    const handleChangeForm = () => {
        setIsLogin((prev) => {
            if (isLogin) {
                setDataDialog([dataForm[0]]);
            } else {
                setDataDialog([dataForm[1]]);
            }
            return !isLogin;
        });
    };
    const handleMore = () => {
        refMore.current.style.display = "none";
        setDataItemSignUp((prev) => {
            return [...prev, ...dataDialog[dataDialog.length - 1].dataMore];
        });
    };
    const handleOption = (detail) => {
        setDataDialog((prev) => {
            return [...prev, detail];
        });
    };
    useEffect(() => {
        setDataItemSignUp(dataDialog[dataDialog.length - 1].data);
    }, [dataDialog]);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("dialog")}>
                <div className={cx("container")}>
                    <div className={cx("wrapper-content")}>
                        <div className={cx("content")}>
                            <h1 className={cx("title")}>
                                {dataDialog[dataDialog.length - 1].title}
                            </h1>
                            {Array.isArray(dataItemSignUp)
                                ? dataItemSignUp.map((data, index) => (
                                      <div
                                          key={index}
                                          className={cx("container-option")}
                                      >
                                          <div
                                              className={cx("box-option", {
                                                  disable: data.disable,
                                              })}
                                              onClick={() =>
                                                  handleOption(data.detail)
                                              }
                                          >
                                              <p className={cx("icon-option")}>
                                                  {data.icon}
                                              </p>
                                              <p>{data.name}</p>
                                          </div>
                                      </div>
                                  ))
                                : dataItemSignUp}
                            {dataDialog[dataDialog.length - 1].isSignUp && (
                                <p
                                    ref={refMore}
                                    className={cx("icon-more")}
                                    onClick={handleMore}
                                >
                                    {dataDialog[dataDialog.length - 1].iconMore}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx("policy-confirm")}>
                    <p className={cx("policy-confirm-text")}>
                        By continuing, you agree to TikTok’s{" "}
                        <a
                            target="_blank"
                            href="https://www.tiktok.com/legal/terms-of-use?lang=en"
                            className={cx("policy-confirm-link")}
                        >
                            Terms of Service
                        </a>{" "}
                        and confirm that you have read TikTok’s{" "}
                        <a
                            target="_blank"
                            href="https://www.tiktok.com/legal/privacy-policy?lang=en"
                            className={cx("policy-confirm-link")}
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
                <div className={cx("footer")}>
                    <p>{dataDialog[dataDialog.length - 1].footer_des}</p>
                    <span className={cx("sign-up")} onClick={handleChangeForm}>
                        {dataDialog[dataDialog.length - 1].footer_link}
                    </span>
                </div>
                <div className={cx("close-dialog")} onClick={handleCloseDialog}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className={cx("icon-close-dialog")}
                    />
                </div>
                {dataDialog.length > 1 && (
                    <div
                        className={cx("prev-dialog")}
                        onClick={handlePrevDialog}
                    >
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className={cx("icon-prev-dialog")}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;

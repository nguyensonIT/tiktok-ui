import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import image from "../../../src/assets/images";
import { ScrollTopIcon } from "../Icons";
import styles from "./BoxScrollToTop.module.scss";

const cx = classNames.bind(styles);
function BoxScrollToTop() {
    const [isGetApp, setIsGetApp] = useState(false);
    const scrollBtnRef = useRef();
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        const handleScroll = () => {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                scrollBtnRef.current.style.transform = "none";
            } else {
                scrollBtnRef.current.style.transform = "translateY(42px)";
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleGetApp = () => {
        setIsGetApp((prev) => {
            if (isGetApp === true) {
                document.body.style.overflow = "unset";
            } else {
                document.body.style.overflow = "hidden";
            }
            return !prev;
        });
    };
    return (
        <>
            <div ref={scrollBtnRef} className={cx("wrapper")}>
                <div className={cx("get-app")}>
                    <span className={cx("get-app-btn")} onClick={handleGetApp}>
                        Get app
                    </span>
                </div>
                <div className={cx("scroll-top")} onClick={handleScrollToTop}>
                    <ScrollTopIcon className={cx("scroll-top-btn")} />
                </div>
            </div>
            {isGetApp && (
                <div className={cx("wrapper-render")}>
                    <div className={cx("container")}>
                        <div className={cx("header-getapp")}>
                            <h1 className={cx("title")}>Get the TikTok app</h1>
                            <span
                                className={cx("close")}
                                onClick={handleGetApp}
                            >
                                &times;
                            </span>
                        </div>
                        <div className={cx("qr-getapp")}>
                            <h1 className={cx("qr-title")}>
                                Scan QR code to download TikTok
                            </h1>
                            <img
                                src={image.qrImage}
                                alt="image qr"
                                className={cx("qr-image")}
                            />
                        </div>
                        <div className={cx("link-app")}>
                            <h1 className={cx("download-title")}>
                                Download from app stores
                            </h1>
                            <div className={cx("box-link")}>
                                <a href="https://www.microsoft.com/store/apps/9NH2GPH4JZS4">
                                    <img
                                        src={image.microsoftImage}
                                        alt="image microsoft"
                                        className={cx("link-image")}
                                    />
                                </a>
                                <a href="https://www.tiktok.com/download-link/af/id1235601864">
                                    <img
                                        src={image.appstoreImage}
                                        alt="image appstore"
                                        className={cx("link-image")}
                                    />
                                </a>
                                <a href="https://www.amazon.com/dp/B07KR1RJL2/">
                                    <img
                                        src={image.amazoneappstoreImage}
                                        alt="image amazoneappstore"
                                        className={cx("link-image")}
                                    />
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=com.ss.android.ugc.trill">
                                    <img
                                        src={image.chplayImage}
                                        alt="image chplay"
                                        className={cx("link-image")}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BoxScrollToTop;

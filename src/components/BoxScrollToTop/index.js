import { useEffect, useRef } from "react";
import { ScrollTopIcon } from "../Icons";
import styles from "./BoxScrollToTop.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function BoxScrollToTop() {
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
    return (
        <div ref={scrollBtnRef} className={cx("wrapper")}>
            <div className={cx("get-app")}>
                <span className={cx("get-app-btn")}>Get app</span>
            </div>
            <div className={cx("scroll-top")} onClick={handleScrollToTop}>
                <ScrollTopIcon className={cx("scroll-top-btn")} />
            </div>
        </div>
    );
}

export default BoxScrollToTop;

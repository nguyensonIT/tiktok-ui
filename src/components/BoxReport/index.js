import { wrapper as PopperWrapper } from "../Popper";

import styles from "./BoxReport.module.scss";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeartCrack } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function BoxReport({ children }) {
    const renderMore = () => {
        return (
            <PopperWrapper className={cx("custome-popper")}>
                <div className={cx("wrapper-more")}>
                    <div className={cx("box-more")}>
                        <span className={cx("icon-box-more")}>
                            <FontAwesomeIcon icon={faHeartCrack} />
                        </span>
                        <span className={cx("text-more")}>Not Interested</span>
                    </div>
                    <div className={cx("box-more")}>
                        <span className={cx("icon-box-more")}>
                            <FontAwesomeIcon icon={faFlag} />
                        </span>
                        <span className={cx("text-more")}>Report</span>
                    </div>
                </div>
            </PopperWrapper>
        );
    };
    return (
        <div>
            <Tippy
                interactive
                render={renderMore}
                delay={[800, 0]}
                placement="right"
                offset={[30, 30]}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default BoxReport;

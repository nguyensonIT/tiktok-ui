import { wrapper as PopperWrapper } from "../Popper";
import styles from "./PopperReport.module.scss";

import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { BlockIcon, FlagIcon } from "../Icons";

const cx = classNames.bind(styles);
function PopperReport({ children, offset = [0, 20] }) {
    const renderItems = () => {
        return (
            <PopperWrapper>
                <div className={cx("wrapper")}>
                    <div className={cx("item")}>
                        <div className={cx("box-item", { flag: true })}>
                            <FlagIcon />
                            <span className={cx("title")}>Report</span>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <div className={cx("box-item")}>
                            <BlockIcon />
                            <span className={cx("title")}>Block</span>
                        </div>
                    </div>
                </div>
            </PopperWrapper>
        );
    };
    return (
        <div>
            <Tippy
                delay={[0, 600]}
                interactive
                placement="top"
                offset={offset}
                render={renderItems}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopperReport;

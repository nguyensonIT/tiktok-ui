import classNames from "classnames/bind";
import Tippy from "@tippyjs/react/headless";
import { wrapper as PopperWrapper } from "../../../Popper";
import { MENU_ITEMS, MENU_MORE } from "../../../../pages/Home/dataMenu";

import styles from "./MenuShare.module.scss";
import MenuItem from "./MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);

function MenuShare({ children }) {
    const refMore = useRef();
    const [dataMenu, setDataMenu] = useState(MENU_ITEMS);
    const handleMore = () => {
        setDataMenu((prev) => {
            refMore.current.style.display = "none";
            return [...prev, ...MENU_MORE];
        });
    };
    const renderItems = () => {
        return (
            <PopperWrapper>
                <div className={cx("menu-body")}>
                    {dataMenu &&
                        dataMenu.map((item, index) => (
                            <MenuItem key={index} data={item} />
                        ))}
                    <span
                        ref={refMore}
                        className={cx("down-menu")}
                        onClick={handleMore}
                    >
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
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
                offset={[80, 20]}
                render={renderItems}
                onHide={() =>
                    setDataMenu(() => {
                        refMore.current.style.display = "block";
                        return [...MENU_ITEMS];
                    })
                }
            >
                {children}
            </Tippy>
        </div>
    );
}

export default MenuShare;

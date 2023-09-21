import classNames from "classnames/bind";
import styles from "./AccountsSideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "../Image";

import Tippy from "@tippyjs/react/headless";
import { wrapper as PopperWrapper } from "../Popper";
import AccountPreview from "./AccountPreview";

const cx = classNames.bind(styles);
function AccountItems({ data }) {
    const renderPreview = (props) => {
        return (
            <div className={cx("preview")} tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive
                render={renderPreview}
                delay={[800, 0]}
                placement="bottom"
                offset={[-20, 0]}
            >
                <div className={cx("wrapper-accountItem")}>
                    <Image
                        className={cx("avatar")}
                        src={data.avatar}
                        alt={data.nickname}
                    />

                    <div className={cx("box-name")}>
                        <span className={cx("username")}>
                            <strong>{data.nickname}</strong>
                            {data.tick && (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className={cx("icon-check")}
                                />
                            )}
                        </span>
                        <p
                            className={cx("name")}
                        >{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default AccountItems;

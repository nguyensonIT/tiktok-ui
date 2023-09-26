import styles from "./AccountPreview.module.scss";
import Button from "../../Button";
import Image from "../../Image";
import * as followingAccountsService from "../../../services/followingAccountsService";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
function AccountPreview({
    data = [],
    isPreviewInVideo = false,
    renderButtonFollow,
    renderButtonDataMain,
}) {
    const dataUserFollow = useSelector((state) => state.dataUserFollow);

    return (
        <div className={cx("wrapper")}>
            <header className={cx("header")}>
                <Image
                    className={cx("avatar")}
                    src={data.avatar}
                    alt={data.nickname}
                />
                <div>
                    {dataUserFollow.length > 0
                        ? renderButtonFollow(dataUserFollow, data.id)
                        : renderButtonDataMain(data, data.id)}
                </div>
            </header>
            <div className={cx("info-preview")}>
                <strong className={cx("nickname")}>{data.nickname}</strong>
                <span>
                    {data.tick && (
                        <FontAwesomeIcon
                            icon={faCheckCircle}
                            className={cx("check-icon")}
                        />
                    )}
                </span>
                <h4
                    className={cx("name")}
                >{`${data.first_name} ${data.last_name}`}</h4>
                <p className={cx("footer")}>
                    <strong className={cx("number")}>
                        {data.followers_count}{" "}
                    </strong>
                    <span className={cx("text-footer")}>Follower</span>
                    <strong className={cx("number")}>
                        {data.likes_count}{" "}
                    </strong>
                    <span className={cx("text-footer")}>Likes</span>
                </p>
            </div>
            {isPreviewInVideo && (
                <div className={cx("content-bio")}>
                    <p className={cx("content-bio-text")}>{data.bio}</p>
                </div>
            )}
        </div>
    );
}

export default AccountPreview;

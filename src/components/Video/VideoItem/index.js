import styles from "../Video.module.scss";
import {
    changeIsPlay,
    changeValueVolumn,
    changeVolumn,
    displayFormLogin,
} from "../../../redux/actions";
import * as likesService from "../../../services/likesService";
import MenuShare from "../../MenuShare";
import BoxReport from "../../BoxReport";

import classNames from "classnames/bind";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {
    faBookmark,
    faCommentDots,
    faEllipsis,
    faHeart,
    faPause,
    faPlay,
    faShare,
    faVolumeOff,
    faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const token = localStorage.getItem("token");
    const [likesCount, setLikesCount] = useState(data?.likes_count);
    const [isLike, setLike] = useState(data?.is_liked);
    const vidRef = useRef();
    const inpRef = useRef();
    const dispatch = useDispatch();
    const isMuted = useSelector((state) => state.isMuted);
    const valueVolume = useSelector((state) => state.valueVolume);
    const isPlay = useSelector((state) => state.isPlay);
    const [beforeValue, setBeforeValue] = useState("0.1");

    const handleLikeVideo = () => {
        if (token) {
            likesService.like(data?.id).catch((err) => console.log(err));
            setLikesCount((prev) => prev + 1);
            setLike(true);
        } else {
            dispatch(displayFormLogin(true));
        }
    };
    const handleUnlikeVideo = () => {
        if (token) {
            likesService.unLike(data?.id).catch((err) => console.log(err));
            setLikesCount((prev) => prev - 1);
            setLike(false);
        } else {
            dispatch(displayFormLogin(true));
        }
    };

    const handleMuted = () => {
        setBeforeValue(inpRef.current.value);
        dispatch(changeVolumn(!isMuted));
        if (isMuted) {
            dispatch(changeValueVolumn(beforeValue));
            if (beforeValue === "0.1") {
                dispatch(changeValueVolumn(1));
            }
        } else {
            dispatch(changeValueVolumn(0.1));
        }
    };
    const handlePlay = () => {
        dispatch(changeIsPlay(!isPlay));
        if (isPlay === true) {
            vidRef.current.pause();
        } else {
            vidRef.current.play();
        }
    };

    const handleChangeValue = (e) => {
        dispatch(changeValueVolumn(parseFloat(e.target.value)));
    };
    useEffect(() => {
        if (valueVolume >= 0.1 && valueVolume <= 1) {
            valueVolume === 0.1
                ? dispatch(changeVolumn(true))
                : dispatch(changeVolumn(false));
            if (vidRef.current.volume) {
                vidRef.current.volume = valueVolume;
            }
        }
    }, [valueVolume]);

    return (
        <div className={cx("video-container")}>
            <div className={cx("video-content")}>
                <video
                    src={data.file_url}
                    poster={data.thumb_url}
                    loop
                    muted={isMuted}
                    className={cx("video")}
                    id="video"
                    ref={vidRef}
                ></video>
                <div className={cx("actions-absolute")}>
                    <div className={cx("box-volumn")}>
                        <span onClick={handleMuted} className={cx("mute")}>
                            {isMuted ? (
                                <FontAwesomeIcon icon={faVolumeXmark} />
                            ) : (
                                <FontAwesomeIcon icon={faVolumeOff} />
                            )}
                        </span>
                        <div className={cx("custom-volume")}>
                            <input
                                type="range"
                                className={cx("volume-slider")}
                                min="0.1"
                                max="1"
                                value={valueVolume}
                                step="0.1"
                                onChange={handleChangeValue}
                                ref={inpRef}
                            />
                        </div>
                    </div>
                    <span onClick={handlePlay} className={cx("play")}>
                        {isPlay ? (
                            <FontAwesomeIcon icon={faPause} />
                        ) : (
                            <FontAwesomeIcon icon={faPlay} />
                        )}
                    </span>
                    <div>
                        <BoxReport>
                            <span className={cx("dot-more")}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </span>
                        </BoxReport>
                    </div>
                </div>
            </div>
            <div className={cx("box-active")}>
                {isLike ? (
                    <p
                        className={cx("icon-wrapper")}
                        onClick={handleUnlikeVideo}
                    >
                        <FontAwesomeIcon
                            className={cx("icon-active", { active: true })}
                            icon={faHeart}
                        />
                    </p>
                ) : (
                    <p className={cx("icon-wrapper")} onClick={handleLikeVideo}>
                        <FontAwesomeIcon
                            className={cx("icon-active")}
                            icon={faHeart}
                        />
                    </p>
                )}
                <p className={cx("quantity")}>{likesCount}</p>
                <p className={cx("icon-wrapper")}>
                    <FontAwesomeIcon
                        className={cx("icon-active")}
                        icon={faCommentDots}
                    />
                </p>
                <p className={cx("quantity")}>{data.comments_count}</p>
                <p className={cx("icon-wrapper")}>
                    <FontAwesomeIcon
                        className={cx("icon-active")}
                        icon={faBookmark}
                    />
                </p>
                <p className={cx("quantity")}>{data.views_count}</p>
                <MenuShare>
                    <p className={cx("icon-wrapper")}>
                        <FontAwesomeIcon
                            className={cx("icon-active")}
                            icon={faShare}
                        />
                    </p>
                </MenuShare>
                <p className={cx("quantity")}>{data.shares_count}</p>
            </div>
        </div>
    );
}

export default VideoItem;

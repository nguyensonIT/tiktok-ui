import classNames from "classnames/bind";
import styles from "../Video.module.scss";
import {
    changeIsPlay,
    changeValueVolumn,
    changeVolumn,
} from "../../../redux/actions";
import { wrapper as PopperWrapper } from "../../Popper";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {
    faBookmark,
    faCommentDots,
    faEllipsis,
    faFlag,
    faHeart,
    faHeartCrack,
    faPause,
    faPlay,
    faShare,
    faVolumeOff,
    faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";

const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const vidRef = useRef();
    const inpRef = useRef();
    // const [isPlay, setIsPlay] = useState(true);
    const dispatch = useDispatch();
    const isMuted = useSelector((state) => state.isMuted);
    const valueVolume = useSelector((state) => state.valueVolume);
    const isPlay = useSelector((state) => state.isPlay);
    const [beforeValue, setBeforeValue] = useState("0.1");

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
        // setIsPlay((prev) => {
        //     if (prev === true) {
        //         vidRef.current.pause();
        //     } else {
        //         vidRef.current.play();
        //     }
        //     return !prev;
        // });
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
                        <Tippy
                            interactive
                            render={renderMore}
                            delay={[800, 0]}
                            placement="right"
                            offset={[30, 30]}
                        >
                            <span className={cx("dot-more")}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </span>
                        </Tippy>
                    </div>
                </div>
            </div>
            <div className={cx("box-active")}>
                <p className={cx("icon-wrapper")}>
                    <FontAwesomeIcon
                        className={cx("icon-active")}
                        icon={faHeart}
                    />
                </p>
                <p className={cx("quantity")}>{data.likes_count}</p>
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
                <p className={cx("icon-wrapper")}>
                    <FontAwesomeIcon
                        className={cx("icon-active")}
                        icon={faShare}
                    />
                </p>
                <p className={cx("quantity")}>{data.shares_count}</p>
            </div>
        </div>
    );
}

export default VideoItem;

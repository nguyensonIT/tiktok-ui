import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "../Icons";
import styles from "./VideoPreview.module.scss";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function VideoPreview({ data, dataPlaying, setDataPlaying }) {
    const videoRef = useRef();

    const handleMouseHover = () => {
        setDataPlaying(data);
    };

    useEffect(() => {
        if (data?.id === dataPlaying?.id) {
            videoRef.current.play();
        } else if (data?.id !== dataPlaying?.id) {
            videoRef.current.pause();
        }
    }, [dataPlaying]);
    return (
        <div className={cx("wrapper-box-video")}>
            {/* content video  */}
            <div className={cx("video-item")} onMouseEnter={handleMouseHover}>
                <div className={cx("video-content")}>
                    <div className={cx("video-wrap")}>
                        <video
                            ref={videoRef}
                            src={data.file_url}
                            poster={data.thumb_url}
                            loop
                            className={cx("video")}
                            muted
                        ></video>
                    </div>
                </div>
                <div className={cx("box-view")}>
                    <PlayIcon className={cx("icon-play")} />
                    <span>1T</span>
                </div>
            </div>
            {/* title */}
            <p className={cx("title-video")}>{data.description}</p>
        </div>
    );
}

export default VideoPreview;

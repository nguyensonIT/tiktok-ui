import { Link } from "react-router-dom";
import styles from "./VideoSuggested.module.scss";

import classNames from "classnames/bind";
import Button from "../../../../components/Button";
import Image from "../../../../components/Image";
import { TickIcon } from "../../../../components/Icons";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { displayFormLogin } from "../../../../redux/actions";

const cx = classNames.bind(styles);

function VideoItem({ dataVideoSuggested, idVideoPlaying, setIdVideoPlaying }) {
    const videoRef = useRef();
    const dispatch = useDispatch();

    const handleMouseHover = () => {
        setIdVideoPlaying(dataVideoSuggested?.popular_video?.id);
    };
    if (idVideoPlaying) {
        if (dataVideoSuggested?.popular_video?.id === idVideoPlaying) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }

    const handleFollow = (e) => {
        e.preventDefault();
        dispatch(displayFormLogin(true));
    };
    return (
        <div className={cx("video")}>
            <Link
                target="_blank"
                to={`/@${dataVideoSuggested.nickname}`}
                className={cx("wrap-link")}
                onMouseEnter={handleMouseHover}
            >
                <div className={cx("content-video")}>
                    <video
                        ref={videoRef}
                        className={cx("video-tag")}
                        src={dataVideoSuggested.popular_video.file_url}
                        poster={dataVideoSuggested.popular_video.thumb_url}
                        loop
                        muted
                    ></video>
                </div>
                <div className={cx("box-info")}>
                    <span className={cx("box-img")}>
                        <Image
                            src={dataVideoSuggested.avatar}
                            alt={dataVideoSuggested.nickname}
                            className={cx("img-tag")}
                        />
                    </span>
                    <h3 className={cx("name")}>
                        {dataVideoSuggested.first_name +
                            " " +
                            dataVideoSuggested.last_name}
                    </h3>
                    <h4 className={cx("nickname")}>
                        <span>{dataVideoSuggested.nickname}</span>
                        {dataVideoSuggested.tick && (
                            <div>
                                <TickIcon className={cx("icon-tick")} />
                            </div>
                        )}
                    </h4>
                    <div className={cx("btn-follow")}>
                        <Button
                            className={cx("btn")}
                            large
                            primary
                            onClick={(e) => handleFollow(e)}
                        >
                            Follow
                        </Button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default VideoItem;

import styles from "./VideoSuggested.module.scss";

import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import VideoItem from "./VideoItem";
import { suggested } from "../../../../services/suggestedAccountsServive";

const cx = classNames.bind(styles);

function VideoSuggested() {
    const [dataVideoSuggested, setDataVideoSuggested] = useState([]);
    const [idVideoPlaying, setIdVideoPlaying] = useState(
        dataVideoSuggested[0]?.popular_video?.id
    );
    useEffect(() => {
        suggested(1, 18)
            .then((res) => setDataVideoSuggested(res))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        setIdVideoPlaying(dataVideoSuggested[0]?.popular_video?.id);
    }, [dataVideoSuggested]);
    return (
        <div className={cx("wrapper")}>
            {dataVideoSuggested &&
                dataVideoSuggested.map((item) => (
                    <VideoItem
                        key={item.id}
                        dataVideoSuggested={item}
                        idVideoPlaying={idVideoPlaying}
                        setIdVideoPlaying={setIdVideoPlaying}
                    />
                ))}
        </div>
    );
}

export default VideoSuggested;

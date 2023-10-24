import { useEffect, useState } from "react";
import VideoPreview from "../../../../components/VideoPreview";
import styles from "./VideosTab.module.scss";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function VideosTab({ dataVideoAnUSer }) {
    const [dataPlaying, setDataPlaying] = useState(dataVideoAnUSer[0]);
    useEffect(() => {
        setDataPlaying(dataVideoAnUSer[0]);
    }, [dataVideoAnUSer]);
    return (
        <div className={cx("wrapper")}>
            {dataVideoAnUSer &&
                dataVideoAnUSer.map((data) => (
                    <VideoPreview
                        key={data.id}
                        data={data}
                        dataPlaying={dataPlaying}
                        setDataPlaying={setDataPlaying}
                    />
                ))}
        </div>
    );
}

export default VideosTab;

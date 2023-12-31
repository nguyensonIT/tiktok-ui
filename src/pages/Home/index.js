import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Video from "../../components/Video";
import styles from "./Home.module.scss";
import * as videoForYouServive from "../../services/videoForYouServive";
import BoxScrollToTop from "../../components/BoxScrollToTop";
import { changeIsPlay } from "../../redux/actions";

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [dataVideo, setDataVideo] = useState([]);
    useEffect(() => {
        videoForYouServive
            .videoForYou("for-you", 1)
            .then((data) => setDataVideo(data.data))
            .catch((err) => console.log(err));
    }, [page]);

    useEffect(() => {
        const elVideos = document.querySelectorAll("#video");
        if (elVideos) {
            let observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.play();
                            dispatch(changeIsPlay(true));
                        } else {
                            entry.target.pause();
                            entry.target.currentTime = 0;
                        }
                    });
                },
                {
                    threshold: 0.8,
                }
            );
            elVideos.forEach((video) => {
                observer.observe(video);
            });
        }
    }, [dataVideo]);

    return (
        <div className={cx("wrapper")}>
            {dataVideo.map((data) => (
                <Video key={data.id} dataVideo={data} />
            ))}
            <BoxScrollToTop />
        </div>
    );
}

export default Home;

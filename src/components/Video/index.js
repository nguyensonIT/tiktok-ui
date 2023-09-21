import Image from "../Image";
import Button from "../Button";
import { wrapper as PopperWrapper } from "../Popper";
import * as followingAccountsService from "../../services/followingAccountsService";

import classNames from "classnames/bind";
import styles from "./Video.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import AccountPreview from "../AccountsSideBar/AccountPreview";
import VideoItem from "./VideoItem";

const cx = classNames.bind(styles);
function Video({ dataVideo }) {
    const token = localStorage.getItem("token");
    const renderPreview = () => {
        return (
            <PopperWrapper>
                <AccountPreview data={dataVideo.user} isPreviewInVideo={true} />
            </PopperWrapper>
        );
    };
    const handleFollowUser = async (data) => {
        const id = data.user.id;
        const fetchFollow = () => {
            followingAccountsService
                .followUser(token, id)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        };
        fetchFollow();
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("left")}>
                    <div>
                        <Tippy
                            interactive
                            render={renderPreview}
                            delay={[800, 0]}
                            placement="bottom-start"
                        >
                            <Image
                                src={dataVideo.user.avatar}
                                alt={dataVideo.user.nickname}
                                className={cx("image")}
                            />
                        </Tippy>
                    </div>
                </div>
                <div className={cx("right")}>
                    <div className={cx("right-wrapper")}>
                        <div className={cx("info")}>
                            <div>
                                <Tippy
                                    interactive
                                    render={renderPreview}
                                    delay={[800, 0]}
                                    placement="bottom-start"
                                >
                                    <div className={cx("info-user")}>
                                        <span className={cx("name")}>
                                            {`${dataVideo.user.first_name} ${dataVideo.user.last_name}`}
                                        </span>
                                        <span>
                                            {dataVideo.user.tick && (
                                                <FontAwesomeIcon
                                                    icon={faCheckCircle}
                                                    className={cx("icon-check")}
                                                />
                                            )}
                                        </span>
                                        <span className={cx("nickname")}>
                                            {" "}
                                            {dataVideo.user.nickname}
                                        </span>
                                    </div>
                                </Tippy>
                            </div>
                            <div className={cx("box-content-text")}>
                                <span className={cx("content-text")}>
                                    {dataVideo.description}
                                </span>
                                <span className={cx("content-tag")}>
                                    {" "}
                                    #hoaa #hoaa
                                </span>
                            </div>
                            <div className={cx("name-music")}>
                                <FontAwesomeIcon
                                    icon={faMusic}
                                    className={cx("icon-music")}
                                />
                                <Link to="#" className={cx("music-link")}>
                                    {" "}
                                    3107 id072019
                                </Link>
                            </div>
                        </div>
                        <div>
                            {/* <Button
                                onClick={() => handleFollowUser(dataVideo)}
                                outline
                                className={cx("following-btn-video")}
                            >
                                Following
                            </Button> */}
                            {dataVideo.user.is_followed ? (
                                <Button
                                    onClick={() => handleFollowUser(dataVideo)}
                                    outline
                                    className={cx("following-btn-video")}
                                >
                                    Following
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleFollowUser(dataVideo)}
                                    outline
                                    className={cx("follow-btn-video")}
                                >
                                    Follow
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={cx("container-video")}>
                        <VideoItem data={dataVideo} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;

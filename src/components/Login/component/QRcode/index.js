import classNames from "classnames/bind";
import styles from "./QRcode.module.scss";

import images from "../../../../assets/images";
import Image from "../../../Image";
import { QRScanIcon, UserMinusIcon } from "../../../Icons";

const cx = classNames.bind(styles);
function QRcode() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("content-left")}>
                <div className={cx("qr-img")}>
                    <Image src={images.qrImage} />
                </div>
                <div className={cx("instruct")}>
                    <p className={cx("instruct-text")}>
                        1. Open the TikTok app on your mobile device
                    </p>
                    <p className={cx("instruct-text")}>
                        2. On Profile, click <UserMinusIcon />
                    </p>
                    <p className={cx("instruct-text")}>
                        3. Click <QRScanIcon /> then scan the QR code to confirm
                        your login information
                    </p>
                </div>
            </div>
            <div className={cx("content-right")}>
                <Image src={images.instructScanGif} />
            </div>
        </div>
    );
}

export default QRcode;

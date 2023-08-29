import classNames from "classnames/bind";
import styles from "./FooterSideBar.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const arrHrefLink = [
    {
        boxOne: [
            {
                text: "About",
                href: "https://www.tiktok.com/about?lang=en",
            },
            {
                text: "Newsroom",
                href: "https://newsroom.tiktok.com/",
            },
            {
                text: "Contact",
                href: "https://www.tiktok.com/about/contact?lang=en",
            },
            {
                text: "Careers",
                href: "https://careers.tiktok.com",
            },
        ],
        boxTwo: [
            {
                text: "Tiktok for Good",
                href: "https://careers.tiktok.com",
            },
            {
                text: "Advertise",
                href: "https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&attr_source=tt_official_site&refer=tiktok_web",
            },
            {
                text: "Developers",
                href: "https://developers.tiktok.com/?refer=tiktok_web",
            },
            {
                text: "Transparency",
                href: "https://www.tiktok.com/transparency",
            },
            {
                text: "TikTok Rewards",
                href: "https://www.tiktok.com/tiktok-rewards/en",
            },
            {
                text: "TikTok Embeds",
                href: "https://www.tiktok.com/embed",
            },
        ],
        boxThree: [
            {
                text: "Help",
                href: "https://support.tiktok.com/en",
            },
            {
                text: "Safety",
                href: "https://www.tiktok.com/safety?lang=en",
            },
            {
                text: "Terms",
                href: "https://www.tiktok.com/legal/terms-of-service?lang=en",
            },
            {
                text: "Privacy",
                href: "https://www.tiktok.com/legal/privacy-policy-row?lang=en",
            },
            {
                text: "Creator Portal",
                href: "https://www.tiktok.com/creators/creator-portal/en-us/",
            },
            {
                text: "Community Guidelines",
                href: "https://www.tiktok.com/community-guidelines?lang=en",
            },
        ],
        boxFour: [
            {
                text: "Dance",
                href: "/channel/dance",
            },
            {
                text: "Arts",
                href: "/channel/arts",
            },
            {
                text: "Food and Drink",
                href: "/channel/food-and-drink",
            },
            {
                text: "Tourism",
                href: "/channel/tourism",
            },
            {
                text: "Production and Manufacturing",
                href: "/channel/production-and-manufacturing",
            },
            {
                text: "Vehicles and Transportation",
                href: "/channel/vehicles-and-transportation",
            },
            {
                text: "Relationship",
                href: "/channel/relationship",
            },
            {
                text: "TikTok Style",
                href: "/channel/tiktok-style",
            },
            {
                text: "Athletics",
                href: "/channel/athletics",
            },
            {
                text: "Hobbies",
                href: "/channel/hobbies",
            },
        ],
    },
];
function FooterSideBar() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-box")}>
                {arrHrefLink[0].boxOne.map((link, index) => (
                    <a key={index} href={link.href}>
                        {link.text}
                    </a>
                ))}
            </div>
            <div className={cx("wrapper-box")}>
                {arrHrefLink[0].boxTwo.map((link, index) => (
                    <a key={index} href={link.href}>
                        {link.text}
                    </a>
                ))}
            </div>
            <div className={cx("wrapper-box")}>
                {arrHrefLink[0].boxThree.map((link, index) => (
                    <a key={index} href={link.href}>
                        {link.text}
                    </a>
                ))}
            </div>
            <div className={cx("wrapper-box")}>
                {arrHrefLink[0].boxFour.map((link, index) => (
                    <Link key={index} to={link.href}>
                        {link.text}
                    </Link>
                ))}
            </div>
            <span className={cx("coppyRight")}>© 2023 TikTok</span>
        </div>
    );
}

export default FooterSideBar;

import TippyHeadless from "@tippyjs/react/headless";
import { wrapper as PopperWrapper } from "../../../../Popper";
import AccountItem from "../../../../AccountItem";
import { useRef, useState, useEffect } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { useDebounce } from "../../../../hook";
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const focusSearch = useRef();

    const debounce = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        setIsLoading(true);
        fetch(
            `https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(
                debounce
            )}&type=less`
        )
            .then((res) => res.json())
            .then((data) => {
                setSearchResult(data.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [debounce]);
    const handleClear = () => {
        focusSearch.current.focus();
        setSearchResult([]);
        setSearchValue("");
    };
    const handleHideResult = () => {
        setShowResult(!showResult);
    };
    console.log(searchResult);
    return (
        <TippyHeadless
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx("search-result")} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx("search-title")}>Accounts</h4>
                        {searchResult.map((acc) => (
                            <AccountItem key={acc.id} acc={acc} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx("search")}>
                <input
                    ref={focusSearch}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !isLoading && (
                    <button className={cx("clear")} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {isLoading && (
                    <FontAwesomeIcon
                        className={cx("loading")}
                        icon={faSpinner}
                    />
                )}
                <button className={cx("search-btn")}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </TippyHeadless>
    );
}

export default Search;

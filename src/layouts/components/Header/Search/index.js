import TippyHeadless from "@tippyjs/react/headless";
import { wrapper as PopperWrapper } from "../../../../components/Popper";
import AccountItem from "../../../../components/AccountItem";
import { useRef, useState, useEffect } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { useDebounce } from "../../../../components/hook";

import * as searchServices from "../../../../services/searchService";
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
        const fetchAPI = async () => {
            try {
                const res = await searchServices.search(debounce);
                setSearchResult(res);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchAPI();
    }, [debounce]);
    const handleClear = () => {
        focusSearch.current.focus();
        setSearchResult([]);
        setSearchValue("");
    };
    const handleHideResult = () => {
        setShowResult(!showResult);
    };
    const handleSearchValue = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearchValue(searchValue);
        }
    };
    return (
        //Using a wrapper <div> or <span> tag around the reference element solves
        //this by creating a new parentNode context.
        <div>
            <TippyHeadless
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div
                        className={cx("search-result")}
                        tabIndex="-1"
                        {...attrs}
                    >
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
                        onChange={handleSearchValue}
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
                    <button
                        className={cx("search-btn")}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </TippyHeadless>
        </div>
    );
}

export default Search;

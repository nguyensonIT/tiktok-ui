import { createContext, useState } from "react";

export const globalContext = createContext();

function GlobalContext({ children }) {
    const [userFollow, setUserFollow] = useState({ id: 0, is_follow: false });
    const context = {
        userFollow,
        setUserFollow,
    };
    return (
        <globalContext.Provider value={context}>
            <div>{children}</div>
        </globalContext.Provider>
    );
}
export default GlobalContext;

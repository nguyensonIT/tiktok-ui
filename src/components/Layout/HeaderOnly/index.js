import Header from "../components/Header";

function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="conatainer">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;

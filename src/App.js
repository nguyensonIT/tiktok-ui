import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts";
import { Fragment } from "react";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import NotificationAuth from "./components/NotificationAuth";

function App() {
    const isFormLogin = useSelector((state) => state.isDisplayLogin);
    const isNotificationLogin = useSelector((state) => state.notificationLogin);
    const isNotificationSignup = useSelector(
        (state) => state.notificationSignup
    );
    const isNotificationRegistered = useSelector(
        (state) => state.notificationRegistered
    );
    const isNotificationLogout = useSelector(
        (state) => state.notificationLogout
    );
    const body = document.querySelector("body");

    if (isFormLogin) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "unset";
    }
    return (
        <Router>
            <div className="App">
                {isFormLogin && <Login />}
                {isNotificationSignup && (
                    <NotificationAuth title="Registered successfully, logging in..." />
                )}
                {isNotificationLogin && (
                    <NotificationAuth title="Success login!" />
                )}
                {isNotificationRegistered && (
                    <NotificationAuth title="Account has been registered!" />
                )}
                {isNotificationLogout && (
                    <NotificationAuth title="Account has been logged out!" />
                )}
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

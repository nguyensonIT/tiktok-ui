export const changeVolumn = (data) => {
    return {
        type: "home/videos/volumn",
        payload: data,
    };
};
export const changeValueVolumn = (data) => {
    return {
        type: "home/videos/volumn/value",
        payload: data,
    };
};
export const changeIsPlay = (data) => {
    return {
        type: "home/videos/play",
        payload: data,
    };
};
export const changeNotificationLogin = (data) => {
    return {
        type: "home/authNotifyLogin",
        payload: data,
    };
};
export const changeNotificationLogout = (data) => {
    return {
        type: "home/authNotifyLogout",
        payload: data,
    };
};
export const changeNotificationRegistered = (data) => {
    return {
        type: "home/authNotifyRegistered",
        payload: data,
    };
};
export const changeNotificationSignup = (data) => {
    return {
        type: "home/authNotifySignup",
        payload: data,
    };
};
export const displayFormLogin = (data) => {
    return {
        type: "home/formLogin",
        payload: data,
    };
};
export const changeDataUser = (data) => {
    return {
        type: "home/dataUser",
        payload: data,
    };
};

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
export const changeTypeNotificationAuth = (data) => {
    return {
        type: "home/authNotify",
        payload: data,
    };
};

const initValue = {
    isMuted: true,
    valueVolume: 0.1,
    isPlay: true,
    isDisplayLogin: false,
    notificationLogin: false,
    notificationLogout: false,
    notificationSignup: false,
    notificationRegistered: false,
    dataUser: {},
};

const rootReducer = (state = initValue, action) => {
    switch (action.type) {
        case "home/videos/volumn":
            return {
                ...state,
                isMuted: action.payload,
            };
        case "home/videos/volumn/value":
            return {
                ...state,
                valueVolume: action.payload,
            };
        case "home/videos/play":
            return {
                ...state,
                isPlay: action.payload,
            };
        case "home/formLogin":
            return {
                ...state,
                isDisplayLogin: action.payload,
            };
        case "home/authNotifyLogin":
            return {
                ...state,
                notificationLogin: action.payload,
            };
        case "home/authNotifyLogout":
            return {
                ...state,
                notificationLogout: action.payload,
            };
        case "home/authNotifySignup":
            return {
                ...state,
                notificationSignup: action.payload,
            };
        case "home/authNotifyRegistered":
            return {
                ...state,
                notificationRegistered: action.payload,
            };
        case "home/dataUser":
            return {
                ...state,
                dataUser: action.payload,
            };
        default:
            return state;
    }
};
export default rootReducer;

const initValue = {
    isMuted: true,
    valueVolume: 0.1,
    isPlay: true,
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
        default:
            return state;
    }
};
export default rootReducer;

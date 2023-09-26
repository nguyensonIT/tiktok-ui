import * as request from "../utils/request";
const token = localStorage.getItem("token");

export const videoForYou = async (type = "for-you", page) => {
    const obj = {
        path: "videos",
        params: {
            type,
            page,
        },
        token: token,
    };
    const resp = await request.GET(obj);
    return resp;
};

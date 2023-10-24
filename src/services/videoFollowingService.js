import * as request from "../utils/request";
const token = localStorage.getItem("token");

export const videoFollowing = async (type = "following", page) => {
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

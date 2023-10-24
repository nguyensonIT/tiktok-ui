import * as request from "../utils/request";
const token = localStorage.getItem("token");

export const getAnUser = async (nickname) => {
    const obj = {
        path: `users/${nickname}`,
        token: token,
    };
    const resp = await request.GET(obj);
    return resp;
};

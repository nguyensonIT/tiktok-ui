import * as request from "../utils/request";
const token = localStorage.getItem("token");

export const like = async (id) => {
    const obj = {
        path: `videos/${id}/like`,
        token: token,
    };
    const resp = await request.POST(obj);
    return resp;
};
export const unLike = async (id) => {
    const obj = {
        path: `videos/${id}/unlike`,
        token: token,
    };
    const resp = await request.POST(obj);
    return resp;
};

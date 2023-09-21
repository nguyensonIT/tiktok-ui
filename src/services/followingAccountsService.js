import * as request from "../utils/request";
export const following = async (token, page) => {
    try {
        const response = await request.get("me/followings", {
            params: {
                page,
            },
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
export const followUser = async (token, id) => {
    try {
        const response = await request.post(`users/${id}/follow`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

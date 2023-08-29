import * as request from "../utils/request";
export const videoForYou = async (type = "for-you", page) => {
    try {
        const response = await request.get("videos", {
            params: {
                type,
                page,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

import * as request from "../utils/request";
export const suggested = async (page, per_page) => {
    try {
        const response = await request.get("users/suggested", {
            params: {
                page,
                per_page,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

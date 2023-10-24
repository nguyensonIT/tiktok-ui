import * as request from "../utils/request";
const token = localStorage.getItem("token");
// export const suggested = async (page, per_page) => {

//     try {
//         const response = await request.GET("users/suggested", {
//             params: {
//                 page,
//                 per_page,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// };
export const suggested = async (page, per_page) => {
    const obj = {
        path: `users/suggested`,
        params: {
            page,
            per_page,
        },
        token: token,
    };
    const resp = await request.GET(obj);
    return resp.data;
};

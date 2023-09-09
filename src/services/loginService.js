import * as request from "../utils/request";
export const login = async (email, password) => {
    const response = await request.post("auth/login", {
        email,
        password,
    });
    return response;
};
export const currentUser = async (token) => {
    try {
        const response = await request.get("auth/me", {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

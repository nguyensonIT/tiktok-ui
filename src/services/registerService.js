import * as request from "../utils/request";
export const register = async (type = "email", email, password) => {
    const response = await request.post("auth/register", {
        type,
        email,
        password,
    });
    return response;
};

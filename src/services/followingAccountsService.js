import * as request from "../utils/request";
const token = localStorage.getItem("token");

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

export const fetchFollowUser = async (id) => {
  const obj = {
    path: `users/${id}/follow`,
    token: token,
  };
  const resp = await request.POST(obj);
  return resp;
};

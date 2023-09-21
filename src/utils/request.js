import axios from "axios";
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, option = {}) => {
  const response = await request.get(path, option);
  return response.data;
};
export const post = async (path, option = {}) => {
  const response = await request.post(path, option);
  return response.data;
};

export const GET = async ({ path, token, params, headers }) => {
  const config = {
    headers: {
      ...headers,
      Authorization: token ? "Bearer " + token : undefined,
    },
    params,
  };
  try {
    const response = await request.get(path, config);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const POST = async ({ path, token, body, params, headers }) => {
  const config = {
    headers: {
      ...headers,
      Authorization: token ? "Bearer " + token : undefined,
    },
    params,
  };
  try {
    const response = await request.post(path, body, config);
    return response.data;
  } catch (err) {
    return err;
  }
};

export default request;

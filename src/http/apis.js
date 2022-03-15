import axiosInstance from "./request";
const API = {
  login: async ({ email, password }) => {
    const user = {
      user: {
        email,
        password,
      },
    };
    return await axiosInstance.post("/users/login", user);
  },
  register: async ({ email, password, username }) => {
    const user = {
      user: {
        email,
        password,
        username,
      },
    };
    return await axiosInstance.post("/users", user);
  },
};

export default API;

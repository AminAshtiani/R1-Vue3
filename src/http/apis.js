import axiosInstance from "./request";
const API = {
  login: ({ email, password }) => {
    const user = {
      user: {
        email,
        password,
      },
    };
    return axiosInstance.post("/users/login", user).then((res) => res.data);
  },
  register: ({ email, password, username }) => {
    const user = {
      user: {
        email,
        password,
        username,
      },
    };
    return axiosInstance.post("/users", user).then((res) => res.data);
  },
  getAllArticles: () => {
    return axiosInstance.get("/articles").then((res) => res.data);
  }
};

export default API;

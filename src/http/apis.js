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
  getAllArticles: (offset = 0, limit = 10) => {
    return axiosInstance
      .get(`/articles?offset=${offset}&limit=${limit}`)
      .then((res) => res.data);
  },
  deleteArticle: (slug) => {
    return axiosInstance.delete(`/articles/${slug}`).then((res) => res.data);
  }
};

export default API;

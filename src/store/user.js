import { defineStore } from "pinia";

const initialValue = {
  username: "",
  email: "",
  bio: "",
  image: "",
  token: "",
};
export const useUser = defineStore("user", {
  state: () => ({
    user: { ...initialValue },
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUserCredential(user) {
      localStorage.setItem("token", user.token);
      this.user = user;
    },
    clearUserCredential() {
      this.user = { ...initialValue };
    },
  },
});

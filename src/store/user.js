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
    getUsername: (state) => state.user.username,
  },
  actions: {
    setUserCredential(user) {
      localStorage.setItem("token", user.token);
      this.user = user;
    },
    clearUserCredential() {
      localStorage.removeItem("token");
      this.user = { ...initialValue };
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});

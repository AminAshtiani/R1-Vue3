<script>
import { useToast } from "vue-toastification";
import LoginForm from "@/components/LoginForm.vue";
import API from "@/http/apis";
import AlertText from "@/components/shared/AlertText.vue";
import { useUser } from "@/store/user";

export default {
  components: {
    LoginForm,
  },
  setup() {
    return {
      toast: useToast(),
      store: useUser(),
    };
  },
  methods: {
    login(email, password) {
      API.login({ email, password })
        .then((res) => {
          this.store.setUserCredential(res.user);
          this.$router.push("/admin");
        })
        .catch((err) => {
          if (err.response) {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Login Failed!",
                msg: "Username or password is invalid",
              },
            });
          } else if (err.request) {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Login Failed!",
                msg: "Check your connection",
              },
            });
          } else {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Login Failed!",
                msg: "Unknown Error",
              },
            });
          }
        });
    },
  },
  provide() {
    return {
      login: this.login,
    };
  },
};
</script>

<template>
  <main>
    <LoginForm />
  </main>
</template>

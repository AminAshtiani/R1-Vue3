<script>
import { useToast } from "vue-toastification";
import RegisterForm from "@/components/RegisterForm.vue";
import API from "@/http/apis";
import AlertText from "@/components/shared/AlertText.vue";
import { useUser } from "@/store/user";

export default {
  components: {
    RegisterForm,
  },
  setup() {
    return {
      toast: useToast(),
      store: useUser(),
    };
  },
  methods: {
    register(email, password, username) {
      API.register({ email, password, username })
        .then((res) => {
          this.store.setUserCredential(res.user);
          this.$router.push("/admin");
        })
        .catch((err) => {
          if (err.response) {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Register Failed!",
                msg: "Username or password is invalid",
              },
            });
          } else if (err.request) {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Register Failed!",
                msg: "Check your connection",
              },
            });
          } else {
            this.toast.error({
              component: AlertText,
              props: {
                strongTitle: "Register Failed!",
                msg: "Unknown Error",
              },
            });
          }
        });
    },
  },
  provide() {
    return {
      register: this.register,
    };
  },
};
</script>

<template>
  <main>
    <RegisterForm />
  </main>
</template>

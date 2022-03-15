<script>
import LoginForm from "../components/LoginForm.vue";
import API from "../http/apis";

export default {
  components: {
    LoginForm,
  },
  methods: {
    login(email, password) {
      const test = API.login({ email, password });

      console.log(test);
    },
    register() {
      console.log("register");
    },
  },
  provide() {
    return {
      login: this.login,
      register: this.register,
    };
  },
};
</script>

<template>
  <main>
    <LoginForm />
  </main>
</template>

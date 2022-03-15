<template>
  <FormContainer title="Login">
    <button @click="submit">Test</button>
  </FormContainer>
</template>
<script>
import FormContainer from "./shared/FormContainer.vue";
export default {
  name: "LoginForm",

  components: [FormContainer],

  inject: ["login"],
  data() {
    return {
      message: "Hello World",
    };
  },
  methods: {
    submit(evt) {
      evt.preventDefault();
      this.login("amin@snapp.express", "1234");
    },
  },
};
</script>

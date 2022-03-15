<template>
  <FormContainer title="Login">
    <form @submit.prevent="submit" class="form" novalidate>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          v-model="email"
        />
        <div
          :class="[
            'invalid-feedback',
            { 'd-block': initialEmptyField && v$.email.$error },
          ]"
        >
          Required Field
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          aria-describedby="emailHelp"
          v-model="password"
        />
        <div
          :class="[
            'invalid-feedback',
            { 'd-block': initialEmptyField && v$.password.$error },
          ]"
        >
          Required Field
        </div>
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <p class="info">
      Don't have account?
      <router-link to="/register"><b>Register</b></router-link>
    </p>
  </FormContainer>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import FormContainer from "./shared/FormContainer.vue";

export default {
  name: "LoginForm",

  components: {
    FormContainer,
  },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  inject: ["login"],
  data() {
    return {
      initialEmptyField: false,
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) {
        this.initialEmptyField = true;
        return;
      }
      this.login(this.email, this.password);
    },
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
};
</script>

<style>
.form {
  width: 100%;
  display: flex;
  flex-flow: column;
}
.info {
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 0;
}
</style>

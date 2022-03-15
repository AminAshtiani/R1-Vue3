<template>
  <FormContainer title="Register">
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
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          v-model="username"
        />
        <div
          :class="[
            'invalid-feedback',
            { 'd-block': initialEmptyField && v$.username.$error },
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
          aria-describedby="passwordHelp"
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
      <button class="btn btn-primary" type="submit">Register</button>
    </form>
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
  inject: ["register"],
  data() {
    return {
      initialEmptyField: false,
      email: "",
      password: "",
      username: "",
    };
  },
  methods: {
    async submit() {
      const result = await this.v$.$validate();
      if (!result) {
        this.initialEmptyField = true;
        return;
      }
      this.register(this.email, this.password, this.username);
    },
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
      username: { required },
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
</style>

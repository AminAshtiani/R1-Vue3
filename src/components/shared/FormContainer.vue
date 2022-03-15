<template>
  <div class="formContainer">
    <div class="container">
      <div class="col col-md-4 offset-md-4">
        <div class="formContainer__jumbotron">
          <h1 class="formContainer__title">{{ title }}</h1>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
};
</script>
<style scoped>
.formContainer {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.formContainer__jumbotron {
  padding: 4rem 2rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: 0.3rem;
}

.formContainer__title {
  text-align: center;
}
</style>

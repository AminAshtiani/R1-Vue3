<template>
  <div class="formContainer">
    <h1>{{ title }}</h1>
    <slot></slot>
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
</style>

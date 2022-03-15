<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark Navbar">
    <a href="#" class="navbar-brand">Arvan Challenge</a>
    <ul class="navbar-nav">
      <li class="nav-item">Welcome {{ username }}</li>
    </ul>
    <button class="btn btn-outline-info ml-info" @click="handleLogout">Logout</button>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  inject: ["logout"],
  props: {
    username: String,
  },
  methods: {
    handleLogout() {
      this.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style>
.Navbar {
  display: flex;
}
.Navbar ul {
  flex: 1;
}
</style>

<template>
  <div class="Layout">
    <Navbar :username="username" />
    <div class="contianer-fluid">
      <div class="row Layout__main">
        <Sidebar />
        <div class="col col-10">
          <main>
            <slot />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/shared/navbar.vue";
import Sidebar from "@/components/shared/sidebar.vue";
import { useUser } from "@/store/user";

export default {
  components: {
    Navbar,
    Sidebar,
  },
  setup() {
    const store = useUser();

    const username = store.getUsername;
    const { clearUserCredential } = store;
    return {
      username,
      logout: clearUserCredential,
    };
  },
  provide() {
    return {
      logout: this.logout,
    }
  }
};
</script>
<style>
.Layout {
  height: 100vh;
  display: flex;
  flex-flow: column;
}
.Layout__main {
  height: 100%;
}
.Layout .contianer-fluid {
  flex: 1;
  overflow: hidden;
}
</style>

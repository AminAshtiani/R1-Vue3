<template>
  <div class="col-2 Sidebar">
    <aside class="Sidebar__aside">
      <h4 class="Sidebar__title">Posts</h4>

      <router-link to="/admin" exact>
        <span class="oi oi-list"></span>
        All Articles
      </router-link>
      <router-link to="/admin/create">
        <span class="oi oi-plus"></span>
        Add Articles
      </router-link>
    </aside>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
};
</script>
<style>
.Sidebar {
  background: #1c7cd5;
  padding: 0;
}

.Sidebar__aside {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}
.Sidebar__title {
  padding: 10px 20px;
  color: white;
}

.Sidebar__aside a {
  text-decoration: none;
  color: white;
  width: 100%;
  padding: 1rem 2rem;
  text-align: left;
}

.Sidebar__aside a.router-link-active {
  background: rgba(86, 192, 224, 0.14);
}
</style>

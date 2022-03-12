import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/admin",
      name: "List",
      exact: true,
      component: () => import("../views/ListView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin/create",
      name: "Create",
      component: () => import("../views/CreateView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin/edit/:slug",
      name: "Edit",
      component: () => import("../views/EditView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;

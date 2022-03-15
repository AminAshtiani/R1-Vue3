import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue-toastification/dist/index.css";

import "bootstrap";

import "bootstrap/dist/js/bootstrap.min.js";

const app = createApp(App);
const toastOptions = {
  position: "top-right",
  closeOnClick: true,
  pauseOnHover: true,
  timeout: 5000,
};
app.use(router);
app.use(createPinia());
app.use(Toast, toastOptions);

app.mount("#app");

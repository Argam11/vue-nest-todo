import "./assets/main.css";
import "@mdi/font/css/materialdesignicons.css";
import "vue3-toastify/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";

import App from "./App.vue";
import router from "./router";

const toastOptions: ToastContainerOptions = {
  autoClose: 50000,
  theme: "colored",
  hideProgressBar: true,
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.use(Vue3Toasity, toastOptions);

app.mount("#app");

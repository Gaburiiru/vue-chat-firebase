import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { auth } from "@/firebase";

import vueChatScroll from "vue-chat-scroll";
Vue.use(vueChatScroll);

Vue.config.productionTip = false;

auth.onAuthStateChanged((user) => {
  if (user) {
    // console.log(user.displayName);
    store.dispatch("setUser", user);
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});

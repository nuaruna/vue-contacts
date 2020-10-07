import Vue from "vue";
import App from "./App.vue";
import router from './router';
import Confirm from "./plugins/confirm";

Vue.config.productionTip = false;
Vue.use(Confirm);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

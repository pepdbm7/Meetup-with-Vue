import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import DateFilter from "./filters/date";

Vue.config.productionTip = false;
Vue.filter("filteredDate", DateFilter);

new Vue({
  router,
  store, //vuex
  render: h => h(App)
}).$mount("#app");

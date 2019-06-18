import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DateFilter from "./filters/date";
import Alert from "./components/Alert.vue";
Vue.config.productionTip = false;
Vue.filter("filteredDate", DateFilter);
Vue.component("app-alert", Alert); //so now we can import it to any other component

new Vue({
  router,
  store, //vuex
  render: h => h(App),
  created() {
    this.$store.dispatch("showAllMeetups");
  }
}).$mount("#app");

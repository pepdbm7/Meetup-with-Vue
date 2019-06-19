import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import DateFilter from "./filters/date";
import Alert from "./components/Alert.vue";
import AssistDialog from "./components/meetup/Assist.vue";

Vue.config.productionTip = false;

//to make components accessible throughout the whole app:
Vue.filter("filteredDate", DateFilter);
Vue.component("app-alert", Alert);
Vue.component("app-meetup-assist", AssistDialog);

new Vue({
  router,
  store, //vuex
  render: h => h(App),
  created() {
    //using lifecycle hook (like react's componentdidmount()), to retrieve data from db:
    this.$store.dispatch("showAllMeetups");
  }
}).$mount("#app");

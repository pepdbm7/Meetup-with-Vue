import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#9BEC04",
    secondary: "#75ad06",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  options: {
    customProperties: true
  }
});

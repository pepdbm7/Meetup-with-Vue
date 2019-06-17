import store from "./store/index";

export default (to, from, next) => {
  // Verifica si hay un usuario activo, con sesión
  if (!store.getters.user) {
    next({ path: "/signin" });
  } else {
    next();
  }
};

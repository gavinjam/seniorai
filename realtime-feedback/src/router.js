import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Tutorial from "./views/Tutorial.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/tutorial",
      name: "tutorial",
      component: Tutorial
    }
  ]
});
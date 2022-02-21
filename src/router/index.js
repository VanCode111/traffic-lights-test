import Vue from "vue";
console.log(Vue);
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:lightName",
    name: "LightsPage",
    component: () => import("../pages/LightsPage"),
  },
  {
    path: "/",
    redirect: "/" + (JSON.parse(localStorage.getItem("light")) || "red"),
  },
];

const router = new VueRouter({
  hashbang: false,
  mode: "history",
  routes,
});

export default router;

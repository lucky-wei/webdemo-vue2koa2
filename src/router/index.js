import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "@/layout/default.vue";
import AuthLayout from "@/layout/auth.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
    component: DefaultLayout,
    children: [
      {
        path: "/index",
        component: () => import("@/views/index/index.vue"),
      },
    ],
  },
  {
    path: "/auth", // 默认首页打开是登录页
    component: AuthLayout,
    children: [
      {
        path: "/login",
        component: () => import("@/views/auth/login.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

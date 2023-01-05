import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("../views/PostsView.vue"),
    },
    {
      path: "/posts/:id",
      name: "postDetail",
      component: () => import("../views/PostDetailView.vue"),
    },
    {
      path: "/modals",
      name: "modals",
      component: () => import("../views/ModalView.vue"),
    },
  ],
});

export default router;

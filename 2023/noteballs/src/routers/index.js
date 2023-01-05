import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "notes",
    component: () => import("@/views/NotesView.vue"),
  },
  {
    path: "/stats",
    name: "stats",
    component: () => import("@/views/StatsView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

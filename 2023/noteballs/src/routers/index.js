import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "notes",
    component: () => import("@/views/NotesView.vue"),
  },
  {
    path: "/edit/:id",
    name: "editNote",
    component: () => import("@/views/EditNote.vue"),
  },
  {
    path: "/stats",
    name: "stats",
    component: () => import("@/views/StatsView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/AuthView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

/**
 * Navigation guards
 */
router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.user && to.name !== "auth") {
    return {
      name: "auth",
    };
  }

  if (authStore.user && to.name === "auth") {
    return false; // go back
  }
});

export default router;

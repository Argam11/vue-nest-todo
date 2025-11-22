import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/Layout.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/Login.vue"),
        },
        {
          path: "/my-account",
          name: "my-account",
          component: () => import("@/views/MyAccount.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/companies",
          name: "companies",
          component: () => import("@/views/Companies.vue"),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "/employees",
          name: "employees",
          component: () => import("@/views/Employees.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();

  // Wait for authentication initialization
  if (!userStore.isInitialized) {
    await userStore.initializeAuth();
  }

  const requiresAuth = to.meta.requiresAuth;

  if (to.name === "login" && userStore.user) {
    next({ name: "home" });
  }

  if (requiresAuth && !userStore.user) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
